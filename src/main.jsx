import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import router from './router/router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}>
          <Home />
        </RouterProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
