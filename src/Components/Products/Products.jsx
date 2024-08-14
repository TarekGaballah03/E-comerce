import { useState } from 'react'
import Style from './Products.module.css'
import { useEffect } from 'react'

export default function Products() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting Products');
    } , [])
    return (
        <div>
            <h2>Products</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}

