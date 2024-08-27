import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import Loading from '../Loading/Loading';

export default function Brands() {
    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const modalRef = useRef(null);

    const { data: brands, isError: brandsError, isLoading: brandsLoading, error: brandsErrorObj } = useQuery({
        queryKey: ['brands'],
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
        select: (data) => data.data.data
    });
    
    const { data: selectedBrand, isError: brandError, isLoading: brandLoading, error: brandErrorObj } = useQuery({
        queryKey: ['brand', selectedBrandId],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${selectedBrandId}`),
        enabled: !!selectedBrandId,
        select: (data) => data.data.data
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedBrandId(null);
            }
        };

        if (selectedBrandId) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedBrandId]);

    if (brandsLoading) {
        return <Loading />;
    }

    if (brandsError) {
        return <h3>{brandsErrorObj.message}</h3>;
    }

    const handleBrandClick = (id) => {
        setSelectedBrandId(id);
    };

    const handleClose = () => {
        setSelectedBrandId(null);
    };

    return (
        <div className='w-[70%] mx-auto'>
            <h1 className='text-center text-green-600 my-5'>All Brands</h1>
            <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-3 dark:text-white">
                {brands.map((brand) => (
                    <div
                        key={brand._id}
                        onClick={() => handleBrandClick(brand._id)}
                        className="border hover:shadow-lg hover:shadow-green-600 transition-all duration-300 cursor-pointer"
                    >
                        <img src={brand.image} alt={brand.slug} className='w-full mx-auto' />
                        <h3 className='text-center p-4 font-light'>{brand.name}</h3>
                    </div>
                ))}
            </div>
            {selectedBrandId && (
                <div className="bg-black bg-opacity-35 fixed inset-0 flex justify-center items-start">
                    <div ref={modalRef} className="bg-white relative max-w-lg w-full rounded-lg mt-5">
                        <div className="flex justify-between p-3">
                            <h2 className='text-2xl text-green-600 text-center'>{selectedBrand?.name}</h2>
                            <IoMdClose className='text-3xl text-gray-600 cursor-pointer' onClick={handleClose} />
                        </div>
                        {brandLoading ? (
                            <Loading />
                        ) : brandError ? (
                            <h3>{brandErrorObj.message}</h3>
                        ) : (
                            selectedBrand && (
                                <div>
                                    <div className='grid md:grid-cols-2 border-t border-b'>
                                        <img src={selectedBrand.image} alt={selectedBrand.name} className='w-full mb-4' />
                                        <img src={selectedBrand.image} alt={selectedBrand.name} className='w-full mb-4' />
                                    </div>
                                    <div className="mt-16">
                                        <button onClick={handleClose} className='absolute bottom-2 right-2 text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Close</button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
