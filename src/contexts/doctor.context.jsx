import { createContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import URLS from "../Assets/apiUrl";
export const DoctorContext = createContext(
    {
        doctors: null,
        isDoctorLoading: false,
        isDoctorError: false,
    }
)
const parseJSONProperties = (obj) => {
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            try {
                obj[key] = JSON.parse(obj[key]);
            } catch (error) {
                // Ignore the error if the string cannot be parsed as JSON
            }
        }
    }
    return obj;
};
const fetchDoctor = async () => {
    const { php } = URLS;
    const { data } = await axios.get(`${php}/doctor-list`);
    return data;
}
export const DoctorProvider = ({ children }) => {
    const { isLoading: isDoctorLoading, isError: isDoctorError, data } = useQuery('Doctor', fetchDoctor, { staleTime: Infinity, retry: false })
    const Doctor = data ? data.data : [];

    const refmoredDoctor = Doctor.map((doc) => {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        return {
            ...parseJSONProperties(doc),
            "rating": randomNumber
        }
    });
    const value = { doctors: refmoredDoctor, isDoctorLoading, isDoctorError }
    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );

}
