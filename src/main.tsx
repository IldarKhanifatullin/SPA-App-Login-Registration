import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { store } from './store/store.ts'
import { injectStore } from './shared/utils/storeRef.ts';
import App from './App.tsx'
// import './index.css'  // конфликтует с 'antd/dist/reset.css'
import 'antd/dist/reset.css';

const rootElement: HTMLElement | null = document.getElementById('root')

if (!rootElement) throw new Error('root not found')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
)

injectStore(store);
