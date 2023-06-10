import React, { useContext, useState } from "react";
import 'https://kit.fontawesome.com/64d58efce2.js';
import Headerimg from '../../Assets/undraw_medicine_b-1-ol.svg';
import './signUp.css';
import { useNavigate } from "react-router-dom";
import { Border } from "../LogIn/login.styles";
import { Link } from "react-router-dom";
import axios from "axios";
import URLS from "../../Assets/apiUrl";
import History from "../HistoryPage/History";
import { AuthContext } from "../../contexts/auth";
export const Signup = (props) => {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [birthday, setBirthday] = useState('');
    const [id, setId] = useState('');
    const nav = useNavigate();
    const handleRadioChange = (event) => {
        setGender(event.target.value);
    }
    const { php } = URLS;

    const createUser = async () => {
        const genderBoolean = gender === "Male";
        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "national_id": id,
            "email": email,
            "phone_number": phone,
            "city": city,
            "gender": genderBoolean,
            "birth_date": birthday,
            "password": password,
            "image_name": "defaultjpg.jpg"
        }
        const response = await axios.post(`${php}/register-patient`, data);
        return response.data;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser();
        await login(email, password)
        nav(`/history`);
    }
    return (
        <div className="sign-up-container">
            <div className="form-container">
                <form className="sign-up" onSubmit={handleSubmit}>
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input value={firstName} onChange={(newName) => setFirstName(newName.target.value)} type="text" placeholder="First Name" name="firstName" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input value={lastName} onChange={(newName) => setLastName(newName.target.value)} type="text" placeholder="Last Name" name="lastName" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-id-card"></i>
                        <input value={id} onChange={(newId) => setId(newId.target.value)} type="text" placeholder="National ID" name="id" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fa fa-envelope"></i>
                        <input value={email} onChange={(newEmail) => setEmail(newEmail.target.value)} type="email" placeholder="E-mail" name="email" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input value={password} onChange={(newPassword) => setPassword(newPassword.target.value)} type="password" placeholder="Password" name="password" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fa fa-phone"></i>
                        <input value={phone} onChange={(newPhone) => setPhone(newPhone.target.value)} type="tel" placeholder="Phone Number" name="phone" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fa fa-calendar"></i>
                        <input value={birthday} onChange={(newBirthday) => setBirthday(newBirthday.target.value)} type="date" placeholder="Birth Date" name="birthday" required></input>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-city"></i>
                        <input value={city} onChange={(newCity) => setCity(newCity.target.value)} type="text" placeholder="Your City" name="city" required></input>
                    </div>
                    <div className="input-field-radio">
                        <ul>
                            <li>
                                <label>Gender: &nbsp; &nbsp;</label>
                            </li>
                            <li>
                                <i className="fas fa-male"></i>
                                <input
                                    className="gender-class"
                                    type="radio"
                                    id="Male"
                                    name="gender"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="m">Male</label>
                                <i className="fas fa-female"></i>
                                <input
                                    className="gender-class"
                                    type="radio"
                                    id="Female"
                                    name="gender"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="f">Female</label>
                            </li>
                        </ul>
                    </div>
                    <input className="signup-btn" type="submit" value={"signup"} />

                    <Border />
                    <div className="content">
                        {<div>Already have an account ? You can Login from <Link style={{ display: "inline-block" }} to='/login'>here.</Link></div>}
                    </div>
                </form>
            </div>
            <img src={Headerimg} className="image" alt=""></img>
        </div>


    )
}