/*
 * Webpack
 *
 * Created on Saturday, September 09, 2021 as webpack.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Libraries
import { Configuration } from 'webpack'

// Definitions
import { Settings } from './definitions/settings'
import { parseEnvironment } from './definitions/environment'

// Configurations
import { createPlugins } from './webpack/plugins'
import { createRules } from './webpack/rules'

// Targets
import { createSettings } from './targets'
import { prepareForDeploy } from './stages/deployment'

const webpack = (settings: Settings): Configuration => ({
    resolve: {
        alias: {
            '@': settings.folders.source.absolute,       // Allows for @/components -> src/components
            '@bundle': settings.folders.bundle.absolute  // Allows for @bundle/assets/image.png -> bundle/<bundleid>/assets/image.png
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: settings.entry.relative,
    context: settings.folders.source.absolute,
    module: {
        rules: createRules(settings)
    },
    plugins: createPlugins(settings),
    performance: {
        hints: false,
    },
    mode: settings.debug ? 'development' : 'production',
    output: {
        publicPath: '/',
        path: settings.folders.output.absolute
    },
})

const main = (env, args): Configuration => {
    const environment = parseEnvironment(env)

    // Create settings from the environment
    const settings = createSettings(environment)

    // Create config (Read above)
    const config = webpack(settings)

    console.dir(settings)

    // Add deploy specifics
    prepareForDeploy(config, settings)

    return config
}


export = main