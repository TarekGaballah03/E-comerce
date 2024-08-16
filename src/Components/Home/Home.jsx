import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

export default function Home() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        arrows: false,
        slidesToShow: 6,
        adaptiveHeight: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    async function getProducts() {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setData(data.data);
    }
    
    async function getCategories() {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(res?.data.data);
    }

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    return (
        <div>
            <div className="slider-container">
            <Slider {...settings}>
                {categories.map((c) => (
                    <div key={c._id} className='p-2'>
                        <img className='h-[200px] w-full object-cover' src={c.image} alt="" />
                        <h3 className='text-sm text-green-600 mt-3'>{c.name}</h3>
                    </div>
                ))}
            </Slider>
            </div>
            <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-3 dark:text-white">
                {data.length === 0 ? <Loading /> :
                    data.map((p) => (
                        <Link to={`/productDetails/${p._id}`} key={p._id}>
                            <div className="group cursor-pointer hover:shadow-xl hover:shadow-green-400 p-3 transition-shadow duration-300">
                                <img src={p.imageCover} className="object-cover dark:mix-blend-multiply" alt="" />
                                <p className="text-sm text-green-600 my-2">{p.category.name}</p>
                                <h3 className="truncate text-lg mb-2">
                                    {p.title.split(" ").slice(0, 2).join(" ")}
                                </h3>
                                <div className="flex justify-between">
                                    <p>{p.price} EGP</p>
                                    <p>{p.ratingsAverage} <FaStar className="text-yellow-400 inline-block" />{" "}</p>
                                </div>
                                <button className='w-full translate-y-full bg-green-600 text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0'>
                                    Add To Cart
                                </button>
                            </div>
                        </Link>
                    ))
                }
            </div>  
        </div>
    );
}
