/*
 * types.d
 *
 * Created on Saturday, September 09, 2021 as types.d.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

declare namespace Geometry {
    interface Position {
        x: number
        y: number
    }
    
    interface Size {
        width: number
        height: number
    }

    interface Frame {
        origin: Position
        size: Size
    }
}
