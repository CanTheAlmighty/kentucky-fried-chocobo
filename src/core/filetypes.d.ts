/*
 * filetypes
 *
 * Created on Monday, September 09, 2021 as filetypes.d.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

/** PNG */
declare module '*.png' {
    /** Information provided by image-size-loader plugin */
    interface ImageSizeData {
        width: number
        height: number
        type: 'png'
        src: string
        bytes: number
    }

    const value: ImageSizeData
    export default value
}

/** JPEG or JPG */
declare module '*.jpg' {
    /** Information provided by image-size-loader plugin */
    interface ImageSizeData {
        width: number
        height: number
        type: 'jpg'
        src: string
        bytes: number
    }

    const value: ImageSizeData
    export default value
}

/** Gif */
declare module '*.gif' {
    /** Information provided by image-size-loader plugin */
    interface ImageSizeData {
        width: number
        height: number
        type: 'gif'
        src: string
        bytes: number
    }

    const value: ImageSizeData
    export default value
}

/** SVG */
declare module '*.svg' {
    const value: unknown
    export default value
}
