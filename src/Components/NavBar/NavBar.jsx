import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { FaCartPlus, FaFacebook, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg"
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { CartContext } from "../../Context/CartContext";
import { WhatchListContext } from "../../Context/WhatchListContext";


export default function Navbar() {
  const { counter } = useContext(CounterContext);
  const { token, setToken } = useContext(UserContext);
  const {cartItems}=useContext(CartContext);
  const{WhatchListItems ,count}=useContext(WhatchListContext);
  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#F8F9FA] border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 mt-0 md:justify-between">
        <div className="">
        <Link to="" className="flex text-3xl items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="" className="cursor-pointer" />
        
        </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex ms-auto items-center p-2 w-10 h-10 justify-between text-sm text-gray-500 rounded-xl lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full grow  lg:flex  items-center lg:w-auto bg-[#F8F9FA] "
          id="navbar-default"
        >
          <div className="mx-auto">
          <ul className="font-medium flex items-center flex-col lg:flex-row lg:p-4 xl:p-0   rounded-xl xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0  dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">
            {token &&  (
              <>
                <li>
                  <Link
                    to=""
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="whatchlist"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    WhishList
                  </Link>
                </li>
                <li>
                  <Link
                    to="products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="category"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Brands
                  </Link>
                </li>
              </>
            )}
          </ul>
          </div>

          <div className="ml-auto">
          <ul className="font-medium flex justify-self-end items-center flex-col p-4 xl:p-0  rounded-xl  xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0  dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">
            {!token &&(
              <>
                <li>
                  <Link
                    to="login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {token && (
              <div className="flex items-center justify-center gap-x-4">
              <li onClick={logOut}>
                <span className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:border-0 xl:hover:text-green-700 xl:p-0 dark:text-white xl:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent">
                  SignOut
                </span>
              </li>
              <li>
              <ToggleMode />
            </li>
            <li className="pe-4 relative">
                <Link to="whatchlist"><FaHeartCirclePlus className="text-gray-500 text-2xl "/></Link>
                <span>{count==0?null:<div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 end-1 dark:border-gray-900">{count}</div>}</span>
              </li>
              <li className="relative">
                <Link to="cart"><FaCartPlus className="text-gray-500 text-2xl "/></Link>
                <span>{cartItems==0?null:<div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-gray-900">{cartItems}</div>}</span>
              </li>
            </div>
            )}
            
           
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ToggleMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef(document.querySelector("html"));
  useEffect(() => {
    toggleDarkFn();
  }, [isDarkMode]);

  function toggleDarkFn() {
    ref.current.classList.toggle("dark", isDarkMode);
  }
  return (
    <>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-xl text-sm p-2.5"
      >
        {isDarkMode ? (
          <svg
            id="theme-toggle-dark-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            id="theme-toggle-light-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </>
  );
}


