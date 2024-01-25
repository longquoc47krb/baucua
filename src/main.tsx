import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './App.scss'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<p>Loading...</p>} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
)
