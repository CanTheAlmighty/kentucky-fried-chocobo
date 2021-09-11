/*
 * Sprite Map
 *
 * Created on Saturday, September 09, 2021 as SpriteMap.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

import { createFrame } from '@util/geometry/Geometry'

/**
 * A sprite Atlas
 * 
 * An atlas is a table containing all the offsets from the origin (top left vertical for images)
 * containing a particular image.
 */
type Atlas<K extends string> = { [alias in K]: Geometry.Frame }

/**
 * Atlas definition
 */
interface AtlasDefinition<K extends string> {
    /** The size of an item within the atlas */
    size: Geometry.Size
    /** The number of columns (horizontal) of items */
    cols: number
    /** An array of keys to be used to index the found items */
    keys: K[]
}

/**
 * Creates a new Atlas from the given settings
 * 
 * @param definition A set of instructions on how to create the atlas
 * 
 * @returns A new atlas keyed by the passed in creator keys.
 */
function createAtlas<K extends string>(definition: AtlasDefinition<K>): Atlas<K> {
    const atlas: Partial<Atlas<K>> = {}

    const { size, cols, keys } = definition

    let index = 0

    for (const key of keys) {
        const row = index % cols
        const col = Math.floor(index / cols)

        atlas[key] = createFrame(row * size.width, col * size.height, size.width, size.height)

        index++
    }

    return atlas as Atlas<K>
}

export { createAtlas }
