/*
 * Webpack Environment
 *
 * Created on Saturday, September 09, 2021 as environment.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

type EnviromentRaw = Partial<Record<string, string>>

interface Environment {
    target?: string
}

const parseEnvironment = (env: EnviromentRaw): Environment => ({
    target: env?.target ?? 'dev'
})

export { parseEnvironment, Environment }
