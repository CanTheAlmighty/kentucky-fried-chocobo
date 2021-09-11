/* 
 * Global Libraries
 *
 * Created on Wednesday, October 10, 2020 as libraries.d.ts
 *
 * Copyright (c) 2020 Chocobo App
 * ----------------------------------------------------------------
 * Libraries that are imported across the whole project from 
 * Global ProvidePlugin (webpack) libraries
 */

import type _Ant from 'antd'
import type _React from 'react'
import type _ReactDOM from 'react-dom'
import type _Redux from 'redux'

declare global {
    const Ant: typeof _Ant
    const React: typeof _React
    const ReactDOM: typeof _ReactDOM
    const Redux: typeof _Redux
}