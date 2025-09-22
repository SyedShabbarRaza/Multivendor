import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import server from "../server.js";
import { useSelector } from "react-redux";
// import { userReducer } from "../redux/reducers/user.js";
// import { loadUser } from "../redux/actions/user.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector((state)=>state.user);

  useEffect(()=>{
    if(isAuthenticated===true)navigate("/")
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios
      .post(
        `${server}/api/auth/loginUser`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Without this cookie will not come to the frontend
        }
      )
      .then((res)=>{
        {
        toast.success("Login Successfull!");
          navigate("/");
          window.location.reload(true);
      }
      }).catch((err)=>{
        toast.error(err)
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 justify-center flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
            </div>

            <div className="mt-1">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>

            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {visible ? (
                <AiOutlineEye
                  size={25}
                  onClick={() => setVisible(false)}
                  className="absolute top-2 right-3 cursor-pointer"
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={() => setVisible(true)}
                  className="absolute top-2 right-3 cursor-pointer"
                />
              )}
            </div>
            <div className={`${styles.noramlFlex} justify-between `}>
              <div className={`${styles.noramlFlex} mt-2`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <a
                href=".forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password
              </a>
            </div>

            <div className="">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mt-2"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2 mt-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
