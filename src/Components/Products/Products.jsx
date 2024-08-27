import { useContext, useEffect, useState } from 'react';
import useProducts from '../../Hooks/useProducts';
import Loading from '../Loading/Loading';
import { FaHeart, FaSpinner, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WhatchListContext } from '../../Context/WhatchListContext';
import { CiHeart } from "react-icons/ci";


export default function Products() {
    const {setCartItems, addToUserCart } = useContext(CartContext);
    const{addToWhatchList,WhatchListItems,setWhatchListItems,removeFromWhatchList,getWhatchList,setCount}=useContext(WhatchListContext);
    const { data: products, isLoading: productsLoading, error: productsError, isError: productsIsError } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [BtnLoading, setBtnLoading] = useState(false)

    useEffect(() => {
        getWhatchList()

    }, [])


    async function updatedWhatchList(id) {
        try {
            const res = await addToWhatchList(id);
            if (res.data.status === 'success') {
                setWhatchListItems(res.data.data);
                toast.success('Item Added', {
                    duration: 4000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
        }
        finally{
        }
    }

    async function addItem(id) {
            setBtnLoading(true);
        try {
            const res = await addToUserCart(id);
            if ( res.data.status == "success") {
                setCartItems(res.data.numOfCartItems);
                toast.success('Item Added', {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to add item');
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
            toast.error('Failed to add item');
        }finally{
            setBtnLoading(false);
        }
    }

    const filteredProducts = products?.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (productsLoading) {
        return <Loading />;
    }

    if (productsIsError) {
        return (
            <div>
                <h3>{productsError?.message || 'An error occurred'}</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="container w-full mx-auto mt-5 mb-5">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div className="container mx-auto grid sm:grid-cols-2 md:grid-cols-4 mt-10 gap-3 dark:text-white">
                {filteredProducts.map((p) => (<div className="group cursor-pointer hover:shadow-xl hover:shadow-green-400 p-3 transition-shadow duration-300">
                    <Link to={`/productDetails/${p._id}`} key={p._id}>
                        <div className="p-3">
                            <img src={p.imageCover} className="object-cover dark:mix-blend-difference" alt={p.title} />
                            <p className="text-sm text-green-600 my-2">{p.category.name}</p>
                            <h3 className="truncate text-lg mb-2">
                                {p.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <div className="flex justify-between">
                                <p>{p.price} EGP</p>
                                <p>{p.ratingsAverage} <FaStar className="text-yellow-400 inline-block" /></p>
                            </div>
                           
                        </div>
                    </Link>
                     <div className="flex">
                     <button
                        disabled={BtnLoading}
                        type='submit'
                         onClick={(e) => {    
                             e.stopPropagation;    
                             e.preventDefault;             
                             addItem(p._id);
                         }}
                         className='w-full translate-y-full bg-green-600 text-white py-2 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0'
                     >
                        {BtnLoading ? <FaSpinner className="mx-auto animate-spin" /> : "Add To Cart"}
                     </button>
                     <span
                            className='px-2'
                            onClick={(e) => {
                                e.stopPropagation(); 
                                updatedWhatchList(p._id);
                            }}
                        >
                            {Array.isArray(WhatchListItems) && WhatchListItems.includes(p._id) ? (
                                <FaHeart className='text-red-800 text-5xl cursor-pointer transition-colors duration-300' />
                            ) : (
                                <FaHeart className='text-gray-500 text-5xl cursor-pointer transition-colors duration-300' />
                            )}
                    </span>
                     </div>
                     </div>))}
            </div>
        </div>
    );
}
