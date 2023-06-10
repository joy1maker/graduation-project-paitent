import CardsContainer from '../cards-container/cards-container.component';
import './booking.css';
import React, { useEffect, useState } from "react";
import { DoctorContext } from '../../contexts/doctor.context';
import { useContext } from 'react';
import axios from 'axios';
import URLS from '../../Assets/apiUrl';
import { UserContext } from '../../contexts/user.context';
import { AppointmentContext } from '../../contexts/Appointment.context';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const Booking = (props) => {
  const { php } = URLS;

  const { doctors } = useContext(DoctorContext);
  const { user } = useContext(UserContext);
  const { refetchAppointments } = useContext(AppointmentContext);
  const nav = useNavigate();
  const [departments, setAvalibleDepartments] = useState([]);
  const [temperature, setTemperature] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const filterDoctors = doctors.filter(doctor => doctor.department_name === selectedDepartment);
  const [reservations, setReservations] = useState([]);
  const [symptomsForm, setSymptomsForm] = useState([
    { id: 1, name: 'Chest Pain', isChecked: false },
    { id: 2, name: 'Vomiting', isChecked: false },
    { id: 3, name: 'Diarrhea', isChecked: false },
    { id: 4, name: 'abdominal pain', isChecked: false },
    { id: 5, name: 'headache', isChecked: false },
    { id: 6, name: 'fatigue', isChecked: false },
    { id: 7, name: 'nausea', isChecked: false },
    { id: 8, name: 'Runny nose', isChecked: false },
    { id: 9, name: 'Fast heart rate', isChecked: false },
    { id: 10, name: 'Spots and blisters', isChecked: false },
    { id: 11, name: 'Poor wound healing', isChecked: false },
    { id: 12, name: 'difficulty breathing', isChecked: false },
    { id: 13, name: 'Muscle or body aches', isChecked: false },
    { id: 14, name: 'Cough', isChecked: false },
    { id: 15, name: 'New loss of taste or smell', isChecked: false },
    { id: 16, name: 'Fever or chills', isChecked: false },
    { id: 17, name: 'Sore throat', isChecked: false }
  ]);
  const [day, setDay] = useState('')
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]
  const [filterdHours, setFilterdHours] = useState(hours);
  const [selectedHour, setSelectedHour] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const styles = {
    "disabled": { backgroundColor: "#4444", cursor: "not-allowed" },
    "enabled": { backgroundColor: "#5995fd", cursor: "pointer" }
  }
  //states------------------------------------------

  useEffect(() => {
    let departmentsTemplate = [];
    let departmentsIDS = [];
    // eslint-disable-next-line
    doctors.map((doc) => {
      if (!departmentsIDS.includes(doc.department_id)) {
        departmentsTemplate.push({ name: doc.department_name, id: doc.department_id })
        departmentsIDS.push(doc.department_id);
      }
    })
    setAvalibleDepartments(departmentsTemplate);
  }, [doctors])
  useEffect(() => {
    if (!selectedDoctor) return;
    const getReservations = async () => {
      const { data } = await axios.get(`${php}/doctor-reservations/${selectedDoctor}`);
      await setReservations(data);
    }
    getReservations();
  }, [selectedDoctor, php])
  useEffect(() => {
    if (day !== '' && reservations.length !== 0) {
      HandleClick();
    }
    //eslint-disable-next-line
  }, [day, reservations])





  //use effects -------------------------------------------
  const handleCheckboxChange = (event, index) => {
    const newSymptoms = [...symptomsForm];
    newSymptoms[index].isChecked = event.target.checked;
    setSymptomsForm(newSymptoms);
  }

  const checkedUserSymptoms = symptomsForm
    .filter((symptomsForm) => symptomsForm.isChecked === true)
    .map((symptomsForm) => symptomsForm.name);

  const bookSympString = JSON.stringify(checkedUserSymptoms);


  const handleChange = (e) => {
    setDay(e.target.value);
  }
  const HandleClick = () => {
    const currentDate = new Date(day);
    const formatedDates = reservations.map((reservation) => reservation.reservation_time)
    const reservedDates = formatedDates.filter((date) => filterDates(new Date(date), currentDate))
    const reservedHours = reservedDates.map((date) => { const d = new Date(date); return (d.getHours()) });
    const t = hours.filter((hour) => !reservedHours.includes(hour));
    setFilterdHours(t);
  }
  const filterDates = (reservedDate, currentDate) => {
    return currentDate.getMonth() === reservedDate.getMonth() && currentDate.getDate() === reservedDate.getDate()
  }

  const createAppointment = async () => {
    const [year, month, Day] = day.split("-");
    const date = new Date(year, month - 1, Day, selectedHour);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const reserveData = {
      "reserved_patient_id": user.id,
      "reserved_doctor_id": selectedDoctor,
      "syptoms": bookSympString,
      "reservation_time": formattedDate,
      "reservation_symptoms": bookSympString,
      "urgent": 0
    }
    // const response = await axios.post(`${php}/make-reservation`, reserveData);
    const response = await axios.post(`${php}/make-reservation?reserved_doctor_id=${selectedDoctor}&reserved_patient_id=${user.id}&symptoms=cough&reservation_time=${formattedDate}&reservation_symptoms=${bookSympString}&urgent=0`);
    await refetchAppointments();
    nav('/reservation');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAppointment();

  }
  useEffect(() => {
    if (selectedDoctor === null || day === '' || selectedHour === null) {
      setDisabled(true);
    }
    else {
      setDisabled(false);
    }
  }, [selectedDoctor, day, selectedHour])


  return (
    <div className='appointment-container'>
      <header className='header-appoint'>Booking</header>
      <div className='booking-content'>
        <div className='book-form'>
          <div className='book-row'>
            <div className='appointment-form form-wraper'>
              <form onSubmit={handleSubmit}>
                <div className='book-form-group'>
                  <select onChange={(e) => { setSelectedDepartment(e.target.value) }} id='dep' className='book-form-select book-form-control booking' placeholder='Select Department'>
                    <option value={""}>Select Department</option>
                    {
                      departments.map((state, idx) => {
                        return <option key={idx} value={state.name}>{state.name}</option>
                      })
                    }
                  </select>
                </div>
                <div className='book-form-group'>
                  <CardsContainer id={selectedDoctor} doctors={filterDoctors} setSelectedDoctor={setSelectedDoctor} />
                </div>
                <div>
                  <div>
                    <input type='date' className='booking' required value={day} onChange={handleChange} ></input>
                  </div>
                  <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                    {
                      filterdHours.map((hour, idx) => <option key={idx} value={hour}>{hour}</option>)
                    }
                  </select>
                </div>
                <div >
                  <input className='booking' required placeholder='Temperature' value={temperature} onChange={(newTemperature) => setTemperature(newTemperature.target.value)}></input>
                </div>
                <p className='symptom-p'>Check Your Symptoms :</p>
                <div class="check-box-form">
                  {symptomsForm.map((symptom, index) => (
                    <div className="check-item-form" key={symptom.id}>
                      <input
                        type="checkbox"
                        checked={symptom.isChecked}
                        onChange={(event) => handleCheckboxChange(event, index)}
                      />
                      <label className='symptom-label'>{symptom.name}</label>
                    </div>
                  ))}
                </div>
                <button type='submit' className='book-btn' disabled={disabled} style={disabled ? styles.disabled : styled.enabled}>Booking</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}