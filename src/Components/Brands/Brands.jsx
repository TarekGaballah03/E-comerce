import { useState } from 'react'
import Style from './Brands.module.css'
import { useEffect } from 'react'

export default function Brands() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting Brands');
    } , [])
    return (
        <div>
            <h2>Brands</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}


