import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WhatchListContext =createContext()
export default function WhatchListContextProvider({children}){
    const token = localStorage.getItem('token');
    const [WhatchListItems, setWhatchListItems] = useState([]);
    const [count, setCount] = useState(null);
    const headers ={token};
function getUserWhatchList(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }
function addToWhatchList(productId){
        return axios.post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            { productId },
            { headers },
        )
        .then(data=>data)
        .catch(err=>err)
        
    }

function removeItemWhatchList(id){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+id,{headers
        })
        .then(data=>data)
        .catch(err=>err)
    }


async function getWhatchList(){
    const response = await getUserWhatchList();
    
    if(response.data.status=="success"){
        setWhatchListItems(response.data.data);
        setCount(response.data.count)

    }
}
useEffect(() => {
    getWhatchList()
}, [])


    return <WhatchListContext.Provider value={{WhatchListItems,setWhatchListItems, getUserWhatchList ,addToWhatchList,removeItemWhatchList ,getWhatchList ,count}}>
        {children}
    </WhatchListContext.Provider>
}