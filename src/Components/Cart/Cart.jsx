import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../Context/CartContext';
import CartItem from '../cartItem/cartItem';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartDetails, setCartDetails] = useState([]);
    const [myId, setMyId] = useState("");
    const { getUserCart ,updateUserCart,removeItemCart ,clearCart ,setCartItems} = useContext(CartContext);

    async function getLoggedUserCart() {
        try {
            const res = await getUserCart();
            if (res.data.status === 'success') {
                setCartDetails(res.data);
                console.log(res.data);
                
                setMyId(res.data?.cartId);
                
            }
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
        }
    }
    async function updatedCart(id,count) {
        try {
            const res = await updateUserCart(id,count);
            if (res.data.status === 'success') {
                setCartDetails(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
        }
    }
    async function removeItemUserCart(id) {
        try {
            const res = await removeItemCart(id);
            if (res.data.status === 'success') {
                setCartDetails(res.data);
                setCartItems(res.data.numOfCartItems);
            }
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
        }
    }
    async function clearUserCart() {
        try {
            const res = await clearCart();
            if (res.data.status === 'success') {
                // setCartDetails(res.data);
                setCartItems([]);
            }
        } catch (error) {
            console.error('Failed to fetch cart details:', error);
        }
    }

    

    useEffect(() => {
        getLoggedUserCart();
        console.log(myId);
    }, []);

    if (cartDetails?.numOfCartItems === 0) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Cart is empty</h2>
              <p className="text-gray-600 mt-2">Add items to your Cart to see them here.</p>
              <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg">
                Go to Shop
              </Link>
            </div>
          </div>
        );
      }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {(
                <div className='mx-auto container'>
                    <div className="flex justify-between my-4">
                        <h3>Total Price: <span className='text-green-600'>{cartDetails?.data?.totalCartPrice}</span></h3>
                        <h3>Total Items: <span className='text-green-600'>{cartDetails?.numOfCartItems}</span></h3>
                        {cartDetails?.numOfCartItems==0?null:<Link to={'/checkout/'+myId}><button className=' bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-400 transition-all duration-500'> Checkout</button></Link>
            }

                    </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartDetails.data?.products.map(p=> <CartItem count={p.count} price={p.price} product={p.product} updatedCart={updatedCart}  removeItemUserCart={removeItemUserCart} />)

                        }
                    </tbody>
                </table>
                {cartDetails?.numOfCartItems==0?null:<button onClick={()=>clearUserCart()} className='mx-auto my-4 block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-all duration-500'> Clear Cart <FaTrash className='inline-block '/></button>
            }
                </div>
            )}
        </div>
    );
}
