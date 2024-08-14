import { useState } from 'react'
import Style from './ProductItem.module.css'
import { useEffect } from 'react'

export default function ProductItem() {
    
    const [counter, setCounter] = useState(0)
    useEffect(()=> {
        console.log('Mounting ProductItem');
    } , [])
    return (
        <div>
            <h2>ProductItem</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta veniam consequatur explicabo sunt excepturi fugit eaque labore nostrum rem voluptatum saepe necessitatibus maiores harum quas expedita perferendis, soluta voluptate temporibus!</p>
        </div>
    )
}


