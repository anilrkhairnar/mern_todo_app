import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import userContext from "../../context/userContext";

import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const { setUserData } = useContext(userContext);
  // navigator
  const navigate = useNavigate();

  // states
  const [user, setUser] = useState({});

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("this is user: ", user);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        user
      );

      if (data.success === true) {
        console.log(data.token);
        Cookies.set("token", data.token, {
          expires: 20,
          path: "/",
        });
        setUserData(data);
        navigate("/todo");
      }
    } catch (error) {
      error.response.data?.validMessage
        ? alert(error.response.data?.validMessage)
        : alert(error.response.data?.message);
      console.log(error.response.data?.message);
    }
  };

  // check if user token is there
  // before Login
  const checkSession = async () => {
    const token = Cookies.get("token");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { token },
        {
          withCredentials: true,
        }
      );

      if (data.success === true) {
        setUserData(data);
        navigate("/todo");
      }
    } catch (error) {
      console.log("error while checking session: ", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center bg-orange-100">
      <form
        onSubmit={handleSubmit}
        className="p-10 lg:w-3/12 flex flex-col gap-4 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-extrabold text-center">Login</h1>
        <input
          type="email"
          placeholder="Email Address"
          className="p-3 text-base rounded-lg border border-gray-300"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 text-base rounded-lg border border-gray-300"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="p-3 text-base font-bold active:bg-blue-600 rounded-lg bg-blue-500 text-white duration-50 ease-in-out">
          Submit
        </button>
        <hr />
        <div className="text-center">
          <h3 className="text-sm text-gray-400">Don't have account yet</h3>
          <h3 className="text-base text-gray-600">let's create</h3>
        </div>
        <Link
          className="p-3 text-base font-bold text-center active:bg-orange-500 rounded-lg bg-orange-400 text-white duration-50 ease-in-out"
          to="/signup"
        >
          SignUp
        </Link>
      </form>
    </div>
  );
};

export default Login;
