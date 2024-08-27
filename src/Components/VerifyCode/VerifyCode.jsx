import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../Context/AuthenticationContext";
import { useContext } from "react";
import { FaSpinner } from "react-icons/fa";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { verifyResetPassword } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await verifyResetPassword(code);
      setSuccessMsg(response.data.message || "Verification successful!");
      setErrMsg("");
      navigate('/ressetPassword');
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Verification failed. Please try again.");
      setSuccessMsg("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 pt-24">
      <h2 className="text-green-600 text-center text-2xl">Verify Code</h2>

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

      <form onSubmit={handleSubmit} className="max-w-md mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="code"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Verification Code
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin flex justify-center" /> : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
