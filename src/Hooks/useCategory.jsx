import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useCategory() {
    const response = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
        select: (data) => data.data.data
    });
  return response
}
