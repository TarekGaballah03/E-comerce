import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import img1 from "../../assets/bags.jpg";
import img2 from "../../assets/music.jpg";
import img3 from "../../assets/blog-img-1.jpeg";
import img4 from "../../assets/blog-img-2.jpeg";
import img5 from "../../assets/main-slider-1.jpeg";
import img6 from "../../assets/main-slider-2.jpeg";
import img7 from "../../assets/main-slider-3.jpeg";
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import Products from '../Products/Products';
import useCategory from '../../Hooks/useCategory';

export default function Home() {
    const images = [img3, img4, img5, img6, img7];

    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        arrows: false,
        slidesToShow: 6,
        adaptiveHeight: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 600, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    const settings2 = {
        dots: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div
              style={{
                padding: "0"
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: i => (
            <div
              style={{
                width: "14px",
                height: "8px",
                borderRadius:"5px",
                backgroundColor: "#D6D6D6",
                
              }}
            >
              
            </div>
          )
    };

    const {  isLoading: productsLoading, error: productsError, isError: productsIsError } = useProducts()
    const { data: categories, isLoading: categoriesLoading, error: categoriesError, isError: categoriesIsError } = useCategory()

    if (productsLoading || categoriesLoading) {
        return <Loading />;
    }

    if (productsIsError || categoriesIsError) {
        return (
            <div>
                <h3>{productsIsError ? productsError.message : ''}</h3>
                <h3>{categoriesIsError ? categoriesError.message : ''}</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="w-[60%] mx-auto mt-10">
                <div className='grid grid-cols-12 mb-4'>
                    <Slider {...settings2} className='col-span-12 md:col-span-8'>
                        {images.map((item, index) => (
                            <div key={index} className='p-2'>
                                <img className='h-[400px] w-full object-cover' src={item} alt={`slider-image-${index}`} />
                            </div>
                        ))}
                    </Slider>
                    <div className="col-span-12 md:col-span-4 bg-sky-400">
                        <img className='md:h-[200px] w-full' src={img1} alt="sidebar-img-1" />
                        <img className='md:h-[200px] w-full' src={img2} alt="sidebar-img-2" />
                    </div>
                </div>
            </div>
            <div className="slider-container mt-10">
                <Slider {...settings}>
                    {categories.map((c) => (
                        <div key={c._id} className='p-2'>
                            <img className='h-[200px] w-full object-cover' src={c.image} alt={c.name} />
                            <h3 className='text-sm text-center text-green-600 mt-3'>{c.name}</h3>
                        </div>
                    ))}
                </Slider>
            </div>
           <Products/>
        </div>
    );
}
