import { useState } from 'react'
import Style from './Home.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'

export default function Home() {
    const [data, setData] = useState([])
    async function getPtoducts(){
     const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    setData(data.data);
    }
    
    useEffect(()=> {
        getPtoducts();
    } , [])
    return (
        <div>
            <div className="gid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {data.length==0?<>loading</>:
            data.map(function(p){return<> 
                 <div className="">
                    <img src={p.imageCover} className="" alt="" />
                    <p className="text-sm text-green-600 my-2">{p.category.name}</p>
                    <h3 className="truncate h4 mb-2">
                        {p.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    {/* <div className="flex  justify-between">
                        <p>{p.price} EGY</p>
                        <p>
                        {p.ratingsAverage} <FaStar className="text-yellow-400 inline-block" />{" "}
                        </p>
                    </div> */}
                </div>
                    </>
               
            })
            }
            </div>  
        </div>
    )
}

