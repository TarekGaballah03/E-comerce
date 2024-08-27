import { useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WhatchListContext } from "../../Context/WhatchListContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { setCartItems,addToUserCart } = useContext(CartContext);
  const{addToWhatchList,setWhatchListItems,WhatchListItems}=useContext(WhatchListContext);

  async function updatedWhatchList(id) {
    try {
        const res = await addToWhatchList(id);
        if (res.data.status === 'success') {
            setWhatchListItems(res.data);
            toast.success('Item Added', {
                duration: 4000,
                position: 'top-center',
            });
        }
    } catch (error) {
        console.error('Failed to fetch cart details:', error);
    }
}

  async function addItem(id) {
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
    }
}
  
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (response) => response.data.data,
    enabled: !!id 
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <h3>{error.message}</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-12">
        <div className="col-span-4 py-5">
          <img src={data?.imageCover} className="w-full" alt={data?.title} />
        </div>
        <div className="col-span-8 self-center py-5">
          <h2>{data?.title}</h2>
          <p className="my-3 font-light">{data?.description}</p>
          <h3 className="mb-2">{data?.category.name}</h3>
          <div className="flex mb-3 justify-start">
            <p>{data?.price} EGY</p>
            <p className="ps-5">
              {data?.ratingsAverage}{" "}
              <FaStar className="text-yellow-400 inline-block" />
            </p>
          </div>
            <div className="grid grid-cols-2 mx-auto">
            <button  onClick={() => {                     
                                    addItem(data._id);
                                }} className="px-5 bg-green-600  text-white rounded-md hover:bg-green-500 transition-all duration-500 ">
            Add To Cart
          </button>
          <span
                 className='px-2'
                  onClick={(e) => {
                   e.stopPropagation(); 
                    updatedWhatchList(data._id);
                      }}
                        >
                   {Array.isArray(WhatchListItems) && WhatchListItems.includes(data._id) ? (
                     <FaHeart className='text-red-800 text-5xl cursor-pointer transition-colors duration-300' />
                    ) : (
                      <FaHeart className='text-gray-500 text-5xl cursor-pointer transition-colors duration-300' />
                     )}
            </span>
            </div>
        </div>
      </div>
    </div>
  );
}
