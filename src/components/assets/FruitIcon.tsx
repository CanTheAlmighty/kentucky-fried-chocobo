/*
 * Fruit
 *
 * Created on Monday, September 09, 2021 as Fruit.tsx
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Assets
import Image from '@bundle/assets/fruit-icons-atlas@2x.png'
import { createSize } from '@util/geometry/Geometry'

// Utils
import { createAtlas } from '@util/image/Atlas'

namespace FruitIcon {
    export type Fruit = 'apple' | 'pear' | 'grape' | 'lemon' | 'raspberry' | 'pineapple' | 'plum'

    export interface Props extends React.HTMLAttributes<HTMLDivElement> {
        fruit: Fruit
    }
}

const Atlas = createAtlas<FruitIcon.Fruit>({ cols: 4, size: createSize(72, 72), keys: ['apple', 'pear', 'grape', 'lemon', 'raspberry', 'pineapple', 'plum'] })

const FruitIcon: React.FC<FruitIcon.Props> = (props) => {
    const { fruit, style, ...rest } = props
    const frame = Atlas[props.fruit]

    return <div style={{ 
        backgroundImage: `url(${ Image.src })`,
        backgroundPosition: `${frame.origin.x}px ${frame.origin.y}px`,
        width: frame.size.width,
        height: frame.size.height,
        ...style
    }} { ...rest } />
}

export { FruitIcon }