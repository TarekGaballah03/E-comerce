import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import LayOut from './Components/LayOut/LayOut'
import Register from './Components/Register/Register'
import UserContextProvider from './Context/UserContext'
import CounterContextProvider from './Context/CounterContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Products from './Components/Products/Products'

const routing = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            {" "}
            <About/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products/>
          </ProtectedRoute>
        ),
      },
      { path: "*", element:<h2 className='h-lvh p-32 text-center text-2xl font-semibold'> 404 | This page could not be found.</h2> },
    ],
  },
]);

function App() {
 
  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={routing}></RouterProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
