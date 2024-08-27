import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading/Loading';

const BaseUrl = "https://ecommerce.routemisr.com";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get(`${BaseUrl}/api/v1/categories`),
    select: (response) => response.data.data,
  });

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/categories/${category._id}/subcategories`);
      setSubcategories(response.data.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>An error occurred: {error.message}</h3>;
  }

  return (
    <div className="w-[70%] mx-auto container">
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {data.map((category) => (
          <div 
            key={category._id} 
            onClick={() => handleCategoryClick(category)} 
            className="border hover:shadow-lg hover:shadow-green-600 transition-all duration-300 cursor-pointer rounded-lg"
          >
            <img src={category.image} alt={category.name} className='object-cover w-full h-[400px] rounded-lg' />
            <h3 className='text-center text-green-600 p-4'>{category.name}</h3>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mx-6 ">
          <h3 className="text-center md:text-5xl text-2xl font-normal text-[#4FA74F] mb-4">{selectedCategory.name} subcategories </h3>
          <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              subcategories.map((subcategory) => (
                <div key={subcategory._id} className="p-4 rounded-lg border hover:shadow-lg hover:shadow-green-600 transition-all duration-300 cursor-pointer">
                  <div className="text-lg font-semibold text-center">{subcategory.name}</div>
                </div>
              ))
           }
          </div>
        </div>
      )}
    </div>
  );
}
