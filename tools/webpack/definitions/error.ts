/*
 * Webpack Error
 *
 * Created on Saturday, September 09, 2021 as error.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

namespace WebpackConfigErrorClass {
    export type Context = 'env' | 'settings' | 'plugins' | 'rules'
}

class WebpackConfigErrorClass extends Error {
    constructor(context: WebpackConfigError.Context, message: string) {
        super(`Webpack [${context}]: ${message}`)
    }
}

namespace WebpackConfigError {
    export type Context = WebpackConfigErrorClass.Context
}

const WebpackConfigError = (context: WebpackConfigError.Context, message: string): WebpackConfigErrorClass => new WebpackConfigErrorClass(context, message)

export { WebpackConfigError }