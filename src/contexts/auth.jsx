import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import URLS from "../Assets/apiUrl";
export const AuthContext = createContext(
  {
    user: null,
    login: () => null,
    logout: () => null,
    api_token: null
  }
);
const { php } = URLS;


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [api_token, setToken] = useState(null);
  // useEffect(() => {
  //   const getLocalData = async () => {
  //     const paitentStringData = await localStorage.getItem("paitent")
  //     if (paitentStringData) {
  //       try {
  //         const paitentObject = await JSON.parse(paitentStringData);
  //         const { paitent, api_token } = paitentObject;
  //         setUser(paitent);
  //         setToken(api_token);
  //       }
  //       catch (error) {
  //         console.log("parse failed");
  //       }
  //     }
  //   }
  //   getLocalData();
  // }, [])
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${php}/login-patient`, { email, password });
      const status = response.status;
      const { patient, api_token } = response.data;
      setUser(patient);
      setToken(api_token);
      localStorage.setItem('paitent', JSON.stringify(response.data));
      return status;
    } catch (error) {
      const status = error.response.status;
      return status;
    }

  };

  const logout = async () => {
    await axios.post(`${php}/logout-patient/?api_token=${api_token}`);
    setUser(null);
    setToken(null);
  };

  const value = { user, login, logout, api_token };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};





