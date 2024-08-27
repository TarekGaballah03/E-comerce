import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext =createContext()
export default function CartContextProvider({children}){
    const token = localStorage.getItem('token');
    const headers ={token};
function getUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function addToUserCart(pID){
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:pID},{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function updateUserCart(id,count){
        return axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+id,{count:count},{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function removeItemCart(id){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+id,{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function clearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function CheckOutSession(cartId,shippingAddress){
        return axios.post( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            {"shippingAddress":shippingAddress}
            ,{headers})
        .then(data=>data)
        .catch(err=>err)
    }

const [cartItems, setCartItems] = useState([]);
async function getCart(){
    const response = await getUserCart();
    if(response.data.success=="success"){
        setCartItems(response.data.numOfCartItems);
    }
}
useEffect(() => {
    getCart()
}, [])


    return <CartContext.Provider value={{cartItems,setCartItems, getUserCart ,addToUserCart,updateUserCart ,removeItemCart,clearCart ,CheckOutSession}}>
        {children}
    </CartContext.Provider>
}