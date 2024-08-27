import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthenticationContext =createContext()
export default function AuthenticationContextProvider({children}){
    const [password, setPassword] = useState(null);
    const token = localStorage.getItem('token');
    const headers ={token};
function forgotPassword(email){
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{email:email
        })
        .then(data=>data)
        .catch(err=>err)
    }
function verifyResetPassword(code){
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode:code
        })
        .then(data=>data)
        .catch(err=>err)
    }
function updatePassword(currentPass,newPass,newRePass){
        return axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',{
            currentPassword:currentPass,
            password:newPass,
            rePassword:newRePass
        },{headers})
        .then(data=>data)
        .catch(err=>err)
    }
function resetPassword(email,newPass){
        return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
            email:email,
            newPassword:newPass
        })
        .then(data=>data)
        .catch(err=>err)
    }




    return <AuthenticationContext.Provider value={{password,setPassword, forgotPassword ,verifyResetPassword,updatePassword ,resetPassword}}>
        {children}
    </AuthenticationContext.Provider>
}