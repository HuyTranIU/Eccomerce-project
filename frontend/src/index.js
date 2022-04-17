import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const container = document.getElementById('root');
const root = createRoot(container);
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '60px',
  transition: transitions.SCALE
}

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>

  </Provider>
);

