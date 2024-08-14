import { useContext, useState } from 'react';
import Style from './Register.module.css';
import { useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';

export default function Register() {
    const {setToken} =useContext(UserContext)
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("The name is required").min(3,"Min input is 3 characters").max(10,"MAx input is 10 characters"),
        email: yup.string().required("The email is required").email("email is nor valid"),
        password: yup.string().matches(/^[A-Z].{3,}/,"password must start with capital character at leat 3 characters").required("Password is required"),
        rePassword:yup.string().oneOf([yup.ref("password")]).required("rePassword is required"),
        phone:yup.string().required().matches(/^01[0125][0-9]{8}$/,"phone must be egyption")
    })
    const navigate = useNavigate();
    const formik =useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },
        onSubmit: handleSubmit,

        validationSchema:schema

    })
    async function handleSubmit(values) {
        setIsLoading(true);
        try {
          const {data} = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signup",
            values
          );
          if(data.message == "success") {
            setToken(data.token);
            navigate('/')
          }
        } catch (error) {
          setErrMsg(error.response.data.message);
          console.log(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      }
    return (
        <div>
            <h2 className="text-green-600 text-center text-2xl" >Register</h2>
            <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

            {errMsg ? (
            <>
                <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
                >
                {errMsg}
                </div>
            </>
            ) : null}
            <div className="relative z-0 w-full mb-5 group">
                <input 
                {...formik.getFieldProps('name')}
                type="text" name="name" id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                {formik.errors.name && formik.touched.name ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    >
                {formik.errors.name}
                </div>
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...formik.getFieldProps('email')} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                {formik.errors.email && formik.touched.email ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    >
                {formik.errors.email}
                </div>
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...formik.getFieldProps('password')} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password </label>
                {formik.errors.password && formik.touched.password ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    >
                {formik.errors.password}
                </div>
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...formik.getFieldProps('rePassword')} type="rePassword" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword </label>
                {formik.errors.rePassword && formik.touched.rePassword ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    >
                {formik.errors.rePassword}
                </div>
                ) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...formik.getFieldProps('phone')} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone </label>
                {formik.errors.phone && formik.touched.phone ? (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                    >
                {formik.errors.phone}
                </div>
                ) : null}
            </div>

            <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </button>       
         </form>
        </div>
    )
}
