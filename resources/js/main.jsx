
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CheckinApp from './CheckinApp'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'

if(document.getElementById('app'))
  ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
      <App />
    </Provider>
  )

if(document.getElementById('checkin'))
  ReactDOM.createRoot(document.getElementById('checkin')).render(
    <Provider store={store}>
      <CheckinApp />
    </Provider>
  )
