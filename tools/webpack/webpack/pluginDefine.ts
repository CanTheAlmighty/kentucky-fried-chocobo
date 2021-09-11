/*
 * Webpack Plugin Define
 *
 * Created on Saturday, September 09, 2021 as pluginDefine.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

import { Settings } from '../definitions/settings'

const createCompileTimeDirectives = (settings: Settings): {} => ({
    debug: settings.debug,
    params: {
        debug: settings.debug,
        hot: settings.deployment === 'hot'
    },
    directives: {

    },
    verbose: settings.debug
})

export { createCompileTimeDirectives }
