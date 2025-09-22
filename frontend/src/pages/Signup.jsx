import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../styles/styles.js";
import { RxAvatar } from "react-icons/rx";
import axios from 'axios'
import server from "../server.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate=useNavigate();

  const {isAuthenticated}=useSelector((state)=>state.user);

  useEffect(()=>{
    if(isAuthenticated===true)navigate("/")
  },[])
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    //Not Working right now saying Too large payLoad
    //     const reader = new FileReader();

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAvatar(reader.result);
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      
      const config={headers:{"Content-Type":"multipart/form-data"}}

    const newForm=new FormData();
    newForm.append("file",avatar);
    newForm.append("name",name);
    newForm.append("email",email);
    newForm.append("password",password);

  await axios.post(`${server}/api/auth/createUser`,newForm,config).then((res)=>{
      console.log(res);
      if(res.data.success===true){
        toast.success(`${res.data.message}`)
        setName("")
        setEmail("")
        setPassword("")
        setAvatar()
      }
      
    })
  }catch(err){
      toast(`${err.response.data.message}`)
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 justify-center flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
            </div>

            <div className="mt-1">
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mt-4 block text-sm font-medium text-gray-700"
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

              <div className="mt-4 flex">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden mt-1">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-300"
                >
                  <span className="cursor-pointer">Upload Avatar</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
           

            <div className="mt-4">
              <button
                type="submit"
                className="cursor-pointer group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mt-2"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.noramlFlex} w-full mt-2`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
