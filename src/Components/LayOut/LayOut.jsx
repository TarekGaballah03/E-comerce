import { useState } from 'react'
import Style from './LayOut.module.css'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function LayOut() {

    return (
        <div>
         <NavBar/>
         <Outlet/>

        </div>
    )
}

