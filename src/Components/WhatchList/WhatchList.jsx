import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WhatchListContext } from '../../Context/WhatchListContext'; // Corrected name
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { FaSpinner } from 'react-icons/fa';

function WhatchList() { // Corrected name
    const [whatchListDetails, setWhatchListDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const { whatchListItems, setWhatchListItems, getUserWhatchList, removeItemWhatchList, setCount } = useContext(WhatchListContext); // Corrected methods
    const { addToUserCart, setCartItems } = useContext(CartContext);

    async function addItem(id) {
        try {
            setBtnLoading(true);
            const res = await addToUserCart(id);
            if (res.data.status === "success") {
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
        } finally {
            setBtnLoading(false);
        }
    }

    async function getLoggedUserWhatchList() { // Corrected name
        try {
            setLoading(true);
            const res = await getUserWhatchList();
            if (res.data.status === 'success') {
                setWhatchListDetails(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch wishlist details:', error);
        } finally {
            setLoading(false);
        }
    }

    async function removeItemUserWhatchList(id) { // Corrected name
        try {
            const res = await removeItemWhatchList(id);
            if (res.data.status === 'success') {
                setWhatchListDetails(prevDetails => ({
                    ...prevDetails,
                    data: prevDetails.data.filter(item => item._id !== id)
                }));
                toast.success('Item Removed', {
                    duration: 4000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Failed to remove item from wishlist:', error);
        }
    }

    useEffect(() => {
        getLoggedUserWhatchList();
    }, []); // Include getUserWhatchList in the dependency array

    if (loading) {
        return <Loading />;
    }

    if (!whatchListDetails.data?.length) { // Ensure data exists and is not empty
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h2>
                    <p className="text-gray-600 mt-2">Add items to your wishlist to see them here.</p>
                    <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg">
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-6 text-green-600">Your Wishlist</h2>
                <div className="w-full max-w-4xl">
                    {whatchListDetails.data.map((product) => (
                        <div key={product._id} className="flex items-start justify-between border rounded-lg p-4 mb-4 bg-gray-100 shadow-md">
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-24 h-24 object-cover mr-4 rounded"
                            />
                            <div className="flex-1">
                                <Link to={`/productDetails/${product._id}`} className="block mb-2 text-lg font-semibold text-blue-600">
                                    {product.title}
                                </Link>
                                <p className="text-gray-600 mb-2">{product.price} EGY</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => removeItemUserWhatchList(product._id)} // Corrected method
                                        disabled={btnLoading}
                                        className={`px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors ${btnLoading ? 'cursor-wait' : ''}`}
                                    >
                                         Remove
                                    </button>
                                    <button
                                        onClick={() => addItem(product._id)}
                                        disabled={btnLoading}
                                        className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors ${btnLoading ? 'cursor-wait' : ''}`}
                                    >
                                        {btnLoading ? <FaSpinner className="mx-auto animate-spin" /> : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhatchList; // Corrected name
