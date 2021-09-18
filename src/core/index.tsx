/*
 * index
 *
 * Created on Saturday, September 09, 2021 as index.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

import { Application } from '../Application'

// Root of the app on html
const root: HTMLElement | null = document.getElementById('root')

const RenderableApplication: React.FC = () => <div>
    <Application />
</div>

// Render the app
ReactDOM.render(<RenderableApplication />, root)