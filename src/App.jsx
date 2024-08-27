import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import LayOut from './Components/LayOut/LayOut'
import Register from './Components/Register/Register'
import UserContextProvider from './Context/UserContext'
import CounterContextProvider from './Context/CounterContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Products from './Components/Products/Products'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import WhatchList from './Components/WhatchList/WhatchList'
import WhatchListContextProvider from './Context/WhatchListContext'
import AuthenticationContextProvider from './Context/AuthenticationContext'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/RessetPassword'
import CheckOut from './Components/CheckOut/CheckOut'
import Allorders from './Components/Allorders/Allorders'


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
      { path: "/verifyCode", element: <VerifyCode /> },
      { path: "/ressetPassword", element: <ResetPassword /> },
      {
        path: "/category",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            {" "}
            <Allorders/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/productDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails/>
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
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            {" "}
            <Brands/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/whatchlist",
        element: (
          <ProtectedRoute>
            {" "}
            <WhatchList/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout/:cartId",
        element: (
          <ProtectedRoute>
            {" "}
            <CheckOut/>
          </ProtectedRoute>
        ),
      },
      { path: "*", element:<h2 className='h-lvh p-32 text-center text-2xl font-semibold'> 404 | This page could not be found.</h2> },
    ],
  },
]);

const myClient = new QueryClient();

function App() {
 
  return (
    <>
      <QueryClientProvider client={myClient}>
        <Toaster/>
       <AuthenticationContextProvider>
        <UserContextProvider>
          <WhatchListContextProvider>
          <CartContextProvider>
              <CounterContextProvider>
                <RouterProvider router={routing}></RouterProvider>
              </CounterContextProvider>
            </CartContextProvider>
          </WhatchListContextProvider>
          </UserContextProvider>
       </AuthenticationContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
