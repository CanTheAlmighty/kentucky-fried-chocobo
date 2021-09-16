/*
 * Webpack Rules
 *
 * Created on Saturday, September 09, 2021 as webpackRules.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Libraries
import { RuleSetRule } from 'webpack'

// Webpack Loaders
import { loader as MiniCSSLoader } from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'

// Plugin Specifics
import { createCompileTimeDirectives } from './pluginDefine'

// Settings
import { Settings } from '../definitions/settings'

const createRules = (settings: Settings): RuleSetRule[] => ([
    {
        test: /\.html?$/,
        use: [{
            loader: 'file-loader',
            options: {
                outputPath: 'html',
                name: '[sha512:hash:base64:7].[ext]'
            }
        }]
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    configFile: settings.configs.babelConfig,
                },
            },
            'source-map-loader',
            {
                loader: 'webpack-preprocessor-loader',
                options: createCompileTimeDirectives(settings)
            }
        ],
        exclude: /node_modules/,
    },
    // Typescript
    {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    configFile: settings.configs.babelConfig,
                    plugins: [
                        [
                            "module-resolver", {
                                "root": ["."],
                                "alias": <Record<string, string>>{
                                    "@Application": "./src/Application",
                                    "@Router": "./src/Router",
                                    "@api": "./src/api",
                                    "@bundle/*": "./bundle/*",
                                    "@components": "./src/components",
                                    "@resources": "./src/resources",
                                    "@hooks/*": "./src/hooks/*",
                                    "@screens": "./src/screens",
                                    "@service/*": "src/service/*",
                                    "@state": "./src/state",
                                    "@styles": "./src/styles",
                                    "@util": "./src/util",
                                    "@typings/*": "./src/typings/*",
                                },
                            }
                        ]
                    ]
                },
            },
            {
                loader: 'webpack-preprocessor-loader',
                options: createCompileTimeDirectives(settings)
            },
            {
                loader: 'ts-loader',
                options: {
                    experimentalFileCaching: true,
                    projectReferences: true,
                    compilerOptions: {
                        getCustomTransformers: settings.deployment === 'hot' ? () => ({
                            before: ReactRefreshTypeScript(),
                        }) : undefined,
                        transpileOnly: settings.deployment === 'hot',
                        // paths: {
                        //     '@bundle/*': [settings.folders.bundle]
                        // }
                    }
                }
            },
        ],
    },
    // Images (Bitmap)
    {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
            {
                loader: '@lesechos/image-size-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'img/[hash].[ext]'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    disable: !settings.optimization.compressImages,
                    optipng: { optimizationLevel: 7 },
                    gifsicle: { interlaced: false }
                }
            }
        ],
    },
    // Images (SVG)
    {
        test: /\.svg$/i,
        use: [
            {
                loader: 'svg-inline-loader',
                options: {
                    removeTags: false,
                    removeSVGTagAttrs: false,
                    idPrefix: '[hash:base64:5]_'
                },
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    svgo: {
                        plugins: [
                            { cleanupIDs: true },
                            { removeViewBox: false },
                            { removeDimensions: true }
                        ]
                    }
                }
            },
        ]
    },
    // Stylesheet: CSS Raw
    {
        test: /\.css$/i,
        use: [
            { loader: MiniCSSLoader },
            { 
                loader: 'css-loader'
            }
        ]
    },
    // Stylesheet: SCSS
    {
        test: /\.scss$/i,
        use: [
            { loader: MiniCSSLoader, },
            {
                // Outputs css.d.ts/less.d.ts/scss.d.ts/etc
                loader: '@teamsupercell/typings-for-css-modules-loader',
                options: {
                    banner: `// Auto-generated file for ${ settings.app.name } v${ settings.app.version } at ${ new Date() }`,
                    formatter: 'none',
                }
            },
            {
                // Rehashes CSS
                loader: 'css-loader',
                options: {
                    esModule: true,
                    modules: {
                        localIdentName: settings.optimization.cssNaming,
                        localIdentContext: settings.folders.source.absolute,
                        exportLocalsConvention: 'camelCase'
                    },
                }
            },
            {
                // Converts Less to CSS
                loader: 'sass-loader',
            }
        ]
    },
])

export { createRules }