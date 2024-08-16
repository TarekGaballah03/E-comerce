import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  async function getProductDetails(id) {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/" + id
    );
    setProductDetails(data.data);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <>
      {productDetails == null ? (
        <h3><Loading/></h3>
      ) : (
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-4 py-5 ">
            <img src={productDetails?.imageCover} className="w-full" alt="" />
          </div>
          <div className="col-span-8 self-center  py-5 ">
            <h2>{productDetails.title}</h2>
            <p className="my-3 font-light">{productDetails.description}</p>
            <h3 className="mb-2">{productDetails.category.name}</h3>

            <div className="flex mb-3 justify-between">
              <p>{productDetails.price} EGY</p>
              <p>
                {productDetails.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>

            </div>
              <button className="w-3/4 bg-green-600 py-1 text-white rounded-md hover:bg-green-500 transition-all duration-500" >Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}


