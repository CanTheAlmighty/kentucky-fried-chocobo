/*
 * index
 *
 * Created on Saturday, September 09, 2021 as index.ts
 *
 * Copyright (c) 2021 Chocobo App
 * ----------------------------------------------------------------
 */

// Libraries
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

// Storage
// import { persistor, store } from '@/state/persistance/Storage'

// App
import { Application } from '@Application'

// Import our rules
import './index.scss'

// Root of the app on html
const root: HTMLElement | null = document.getElementById('root')

// const RunnableApplication: React.FC = () =>
//     <Provider store={ store }>
//         <PersistGate loading={ null } persistor={ persistor }>
//             <Ant.ConfigProvider>
//                 <BrowserRouter>
//                     <Application />
//                 </BrowserRouter>
//             </Ant.ConfigProvider>
//         </PersistGate>
//     </Provider>

const RunnableApplication: React.FC = () => <Application />

// Render the app
ReactDOM.render(<RunnableApplication />, root)