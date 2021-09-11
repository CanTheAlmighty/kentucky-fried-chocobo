/*
 * Webpack Settings
 *
 * Created on Saturday, September 09, 2021 as settings.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

import type { Configuration } from 'webpack'

import { resolve } from 'path'

interface Path {
    absolute: string
    relative: string
}

function Path(relative: string) {
    return {
        relative,
        get absolute() { return resolve(relative) }
    }
}

interface Settings {
    name: string
    debug: boolean
    entry: Path
    template: Path
    deployment: 'bundled' | 'hot'
    mode: Configuration['mode']
    app: {
        name: string
        nameKebab: string
        version: string
    }
    folders: {
        bundle: Path 
        source: Path
        output: Path
    }
    configs: {
        babelConfig: string
    }
    optimization: {
        compressImages: boolean
        codeUsedExports: boolean
        cssNaming: string
    }
    devServer: {
        host: string
        port: number
    }
}

export { Settings, Path }