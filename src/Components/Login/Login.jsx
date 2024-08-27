import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { AuthenticationContext } from "../../Context/AuthenticationContext";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const { forgotPassword } = useContext(AuthenticationContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [resetMsg, setResetMsg] = useState("");
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z].{5,}/, "Password must start with an uppercase letter and be at least 6 characters long"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      if (data.message === "success") {
        setToken(data.token);
        navigate('/');
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(email) {
    try {
      const response = await forgotPassword(email);
      setResetMsg(response.data.message || "Verification code sent to your email.");
      setForgotPasswordModal(false); 
      navigate('/verifyCode'); 
    } catch (error) {
      setResetMsg("An error occurred: " + (error.response?.data?.message || "Error sending verification code"));
    }
  }

  return (
    <div className="p-4 pt-24">
      <h2 className="text-green-600 text-center text-2xl">Login</h2>

      {errMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errMsg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="max-w-md mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setForgotPasswordModal(true)}
            className="font-bold hover:text-green-500 transition-all duration-500"
          >
            Forgot Your Password?
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </div>
      </form>

      {forgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Forgot Password</h3>
            {resetMsg && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {resetMsg}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(e.target.email.value); }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="block py-2 px-4 w-full mb-4 border border-gray-300 rounded-lg"
                required
              />
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setForgotPasswordModal(false)}
                className="text-gray-500 hover:text-gray-800 mt-4 w-full text-sm"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
