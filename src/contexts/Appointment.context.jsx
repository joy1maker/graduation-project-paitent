import { createContext, useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { AuthContext } from "./auth";
import URLS from "../Assets/apiUrl";
export const AppointmentContext = createContext(
    {
        reservations: [],
        isReservationLoading: false,
        isReservationError: false,
        refetchAppointments: () => null
    }
)
const { php } = URLS;
const fetchReservation = async (id) => {
    const { data } = await axios.get(`${php}/patient-reservations/${id}`);
    return data.reservations;
}
export const AppointmentProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { isLoading: isReservationLoading, isError: isReservationError, data: reservations, refetch: refetchAppointments } = useQuery('reservation', () => fetchReservation(user.id), { staleTime: Infinity, retry: false, enabled: user !== null })

    const value = { reservations, isReservationLoading, isReservationError, refetchAppointments }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );

}
