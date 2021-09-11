/*
 * Geometry
 *
 * Created on Saturday, September 09, 2021 as Geometry.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

function createSize(width: number = 0, height: number = 0): Geometry.Size {
    return { width, height }
}

function createPosition(x: number = 0, y: number = 0): Geometry.Position {
    return { x, y }
}

function createFrame(obj: Partial<Geometry.Frame>): Geometry.Frame
function createFrame(pos: Geometry.Position, size: Geometry.Size): Geometry.Frame
function createFrame(x: number, y: number, width: number, height: number): Geometry.Frame
function createFrame(posOrObjOrX: number | Partial<Geometry.Frame> | Geometry.Position, sizeOrY?: number | Geometry.Size, width: number = 0, height: number = 0): Geometry.Frame {
    // Case: x, y, w, h
    if (typeof posOrObjOrX === 'number') return { origin: {x: posOrObjOrX as number, y: sizeOrY as number}, size: { width, height } }

    // Case position/size
    if (sizeOrY !== undefined && typeof sizeOrY === 'object') return { origin: posOrObjOrX as Geometry.Position, size: sizeOrY }

    // Case partial object
    return { ...{ origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } }, ...posOrObjOrX }
}

export { createFrame, createSize, createPosition }
