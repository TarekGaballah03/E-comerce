import { useState } from 'react'
import Style from './Allorders.module.css'
import { useEffect } from 'react'

function Allorders() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting Allorders');
    } , [])
    return (
        <div>
            <h2>Allorders</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}

export default Allorders
