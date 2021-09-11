/*
 * targets
 *
 * Created on Saturday, September 09, 2021 as targets.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

import { Path, Settings } from './definitions/settings'
import { Environment } from './definitions/environment'
import { WebpackConfigError } from './definitions/error'

// MARK: - Base Target

const TargetStandards: Settings = {
    name: 'base',
    debug: true,
    entry: Path('./core/index.tsx'),
    template: Path('./core/index.html.ejs'),
    mode: 'development',
    app: {
        name: 'Chocobo App',
        nameKebab: 'chocobo-app',
        version: 'auto', // This gets replaced
    },
    folders: {
        bundle: Path('./bundle/'),
        output: Path('./dist/'),
        source: Path('./src/'),
    },
    configs: {
        babelConfig: './tools/babel/babel.config.json'
    },
    deployment: 'bundled',
    optimization: {
        compressImages: true,
        codeUsedExports: true,
        cssNaming: '[]',
    },
    devServer: {
        host: 'localhost',
        port: 8080,
    }
}

type TargetConstructor = (env: Environment) => Settings

// MARK: - Individual Targets

const TargetDevelopment: TargetConstructor = (env) => ({
    ...TargetStandards,
    name: 'Development',
    debug: true,
    deployment: 'hot',
    mode: 'development',
    optimization: {
        ...TargetStandards.optimization,
        compressImages: true,
        codeUsedExports: true,
        cssNaming: '[path][name]__[local]--[hash:base64:5]',
    },
})

const TargetProduction: TargetConstructor = (env) => ({
    ...TargetStandards,
    name: 'Production',
    debug: false,
    deployment: 'bundled',
    mode: 'development',
    optimization: {
        ...TargetStandards.optimization,
        compressImages: false,
        codeUsedExports: true,
        cssNaming: '[hash:base64:5]',
    },
})

// MARK: - Target Table

const TargetTable = {
    dev: TargetDevelopment,
    prod: TargetProduction,
}

// MARK: - Other Effects

const updateTargetVersion = (settings: Settings) => {
    if (settings.app.version !== 'auto') return

    const version = process.env.npm_package_version as string

    if (version) {
        settings.app.version = version
    }
    else {
        settings.app.version = '1.0.0'
    }
}

// MARK: - Creation

const createSettings = (env: Environment): Settings => {
    const allTargets = Object.keys(TargetTable) as Array<keyof typeof TargetTable>
    let targetConstructor: TargetConstructor | undefined = undefined

    if (env.target) {
        if (!allTargets.includes(env.target as any)) {
            throw WebpackConfigError('env', `Unknown target ${env.target}, please use --env.target=[${ allTargets.join(', ') }]`)
        }

        targetConstructor = TargetTable[env.target]
    }
    else {
        // Default to dev
        targetConstructor = TargetTable.dev
    }

    const settings = targetConstructor(env)

    // After-creation changes
    updateTargetVersion(settings)

    return settings
}

export { createSettings }
