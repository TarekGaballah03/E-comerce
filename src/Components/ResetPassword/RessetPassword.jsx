import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Context/AuthenticationContext";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const {  resetPassword } = useContext(AuthenticationContext);

  const resetPasswordFormik = useFormik({
    initialValues: {
      email:"",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email address"),
      newPassword: Yup.string()
        .required("New password is required")
        .matches(/^[A-Z].{5,}/, "Password must start with an uppercase letter and be at least 6 characters long"),
      confirmPassword: Yup.string()
        .required("Please confirm your new password")
        .oneOf([Yup.ref('newPassword'), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await resetPassword(values.email,values.newPassword); 
        setSuccessMsg("Password reset successfully.");
        navigate('/login'); 
      } catch (error) {
        setErrMsg("Failed to reset password: " + (error.response?.data?.message || "Error resetting password"));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="p-4 pt-24">
      <h2 className="text-green-600 text-center text-2xl">Reset Password</h2>

      {errMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          {successMsg}
        </div>
      )}

      { (
        <form onSubmit={resetPasswordFormik.handleSubmit} className="max-w-md mt-5 mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetPasswordFormik.getFieldProps("email")}
              type="text"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {resetPasswordFormik.errors.email}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetPasswordFormik.getFieldProps("newPassword")}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {resetPasswordFormik.errors.newPassword}
              </div>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...resetPasswordFormik.getFieldProps("confirmPassword")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {resetPasswordFormik.errors.confirmPassword && resetPasswordFormik.touched.confirmPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {resetPasswordFormik.errors.confirmPassword}
              </div>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin flex justify-center" /> : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
