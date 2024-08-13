import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';

import App from './App.jsx'
import { store } from './redux/store'
import './index.css'

Modal.setAppElement('#root');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
