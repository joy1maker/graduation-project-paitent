import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { AuthContext } from "./auth";
import URLS from "../Assets/apiUrl";


const { php } = URLS;
export const UserContext = createContext(
    {
        user: null,
        isUserLoading: false,
        isUserError: false,
    }
)
const fetchUserData = async (userInfo, api_token) => {
    try {
        const { data } = await axios.get(`${php}/show-patient/${userInfo.id}?api_token=${api_token}`)
        return data;
    }
    catch (error) {
        const status = error.response.status;

        return { "message": "no emr exist", status };
    }
}
const fetchEMRData = async (id) => {
    const { data } = await axios.get(`http://localhost:8000/api/patients-emr/${id}`);
    return data;
}
export const UserProvider = ({ children }) => {
    const { user: userInfo, api_token } = useContext(AuthContext);
    const { isLoading: isUserLoading, isError: isUserError, data } = useQuery('user-data', () => fetchUserData(userInfo, api_token), { staleTime: 6000, retry: false, enabled: userInfo !== null })
    const user = data ? data.data : [];
    // const { isLoading: isEMRLoading, isError: isEMRError, data: EMRData } = useQuery('emr-data', () => fetchEMRData(userInfo.id), { staleTime: 6000, retry: false, enabled: userInfo !== null })

    const value = { user, isUserLoading, isUserError }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );

}

