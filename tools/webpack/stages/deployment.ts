/*
 * Webpack Deployment
 *
 * Created on Saturday, September 09, 2021 as deployment.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Libraries
import { Configuration } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { merge } from 'webpack-merge'

// Definitions
import { Settings } from '../definitions/settings'

// Plugins
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const createBundledDeploy = (settings: Settings): Configuration => ({
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false, // Breaks VideoJS if `true`, WHY LISA
                    warnings: true
                }
            })
        ],
        usedExports: settings.optimization.codeUsedExports,
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    enforce: true,
                }
            }
        }
    },
    output: {
        filename: `bundle.[name].${settings.app.version}.[fullhash].min.js`,
    },
    devtool: 'source-map',
    plugins: [],
})

const createHMRDeploy = (settings: Settings): Configuration & { devServer: DevServerConfiguration } => ({
    mode: 'development',
    devServer: {
        hot: 'only',
        historyApiFallback: {
            disableDotRule: true
        },
        host: settings.devServer.host,
        port: settings.devServer.port,
        open: false,
        
    },
    optimization: {
        minimize: false,
        moduleIds: 'named',
        usedExports: settings.optimization.codeUsedExports,
    },
    devtool: 'eval',
    plugins: [
        new ReactRefreshWebpackPlugin(),
        // new WatchIgnorePlugin([ /\.(?:s?css|less)\.d\.ts$/ ]),
    ],
    watchOptions: {
        // ignored: [ /css\.d\.ts$/, /\.md$/ ]
    }
})

const prepareForDeploy = (config: Configuration, settings: Settings): Configuration => {
    let changes: Partial<Configuration> = {}

    switch (settings.deployment) {
        case 'hot':     changes = createHMRDeploy(settings); break
        case 'bundled': changes = createBundledDeploy(settings); break
    }

    return merge(config, changes)
}

export { prepareForDeploy }