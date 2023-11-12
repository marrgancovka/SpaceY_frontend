import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>Это наша первая страница</h1>
//   },
//   {
//     path: '/new',
//     element: <h1>Эта страница с чем то новеньким</h1>
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
