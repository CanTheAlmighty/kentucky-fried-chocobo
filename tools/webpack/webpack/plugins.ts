/*
 * Webpack Plugins
 *
 * Created on Saturday, September 09, 2021 as webpackPlugins.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Libraries
import { WebpackPluginInstance } from 'webpack'

// Webpack Plugins
import { DefinePlugin, ProvidePlugin, ids } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// Settings
import { Settings } from '../definitions/settings'

const createRuntimeVariables = (settings: Settings): Record<string, any> => ({
    'APP_NAME': JSON.stringify(settings.app.name),
    'APP_VERSION': JSON.stringify(settings.app.version),
})

// MARK: - Plugins

const createPlugins = (settings: Settings): WebpackPluginInstance[] => [
    // Allows loading a .html.ejs file
    new HtmlWebpackPlugin({ template: settings.template.relative }),
    // Same as an extract plugin but for CSS, creates a .css file and links it on the html
    new MiniCssExtractPlugin({
        filename: `bundle.[name].${ settings.app.version }.css`,
        chunkFilename: `bundle.[name].[contenthash].css`
    }),
    // Allows creating run-time variables
    new DefinePlugin(createRuntimeVariables(settings)),
    // Adds support for [hash] generation calls.
    new ids.HashedModuleIdsPlugin(),
    // All code pre-imports the following modules
    new ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        Redux: 'redux',
    })
]

export { createPlugins }