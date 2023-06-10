import { React } from "react";
import { useContext } from "react";
import './reservation.css';
import { useNavigate } from "react-router-dom";
import { Noappointment } from "./noAppointment";
import { AppointmentContext } from "../../contexts/Appointment.context";
import axios from 'axios';
import { DoctorContext } from "../../contexts/doctor.context";
import URLS from "../../Assets/apiUrl";
export const Trueappointment = (props) => {
  const { php } = URLS;
  const { reservations, refetchAppointments } = useContext(AppointmentContext);
  const { doctors } = useContext(DoctorContext);

  const reReservations = reservations.map((reservation) => {
    const doctor = doctors.find((doc) => doc.id === reservation.reserved_doctor_id);
    const date = new Date(reservation.reservation_time);
    const formattedHour = date.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    return {
      time: formattedHour,
      doctorName: doctor.first_name + " " + doctor.last_name,
      department: doctor.department_name,
      date: reservation.reservation_time,
      doc: doctor,
      ...reservation
    }
  });

  const nav = useNavigate()
  const onNavigateHandeler = (doc) => {
    nav(`/ask`, { state: doc })
  }



  const handleDelete = (id) => {
    axios.post(`${php}/delete-reservation/${id}`)
      .then(response => {
        console.log(response.data);
        refetchAppointments();
      })
      .catch(error => {
        console.error(error);
      });
  };


  if (!reservations || reservations.length === 0) {
    return (
      <Noappointment />
    )
  }
  return (
    <>
      <div>
        <h2 className="h2-reserve">Your Appointments</h2>
        {reReservations.map(appointment => (

          <div className="an-appoint-edit" key={appointment.id}>
            <h3 className="h3-edit">{appointment.department}</h3>
            <p className="edit-element">{appointment.date}</p>
            <p className="edit-element">{appointment.time}</p>
            <p className="edit-element">Dr. {appointment.doctorName}</p>
            {/* <button className="btn-edit-appoint" onClick={() => handleDelete(reservation.id) & onDeleteAppointment(reservation.id)}>Delete</button> */}
            <button className="btn-edit-appoint" onClick={() => handleDelete(appointment.id)}>Delete</button>
            <button className="btn-edit-appoint" onClick={() => onNavigateHandeler(appointment.doc)}>Ask Doctor</button>
          </div>
        ))}
      </div>
    </>
  );
}