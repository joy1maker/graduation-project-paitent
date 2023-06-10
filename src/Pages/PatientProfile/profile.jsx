import './profile.css';
import profileimg from '../../Assets/profile.jpg';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import axios from 'axios';
import URLS from '../../Assets/apiUrl';
export const Profile = (props) => {
  const { php } = URLS;
  const { user } = useContext(UserContext);

  const { password, image_name } = user;
  const [firstName, setfirstName] = useState(user.first_name);
  const [lastName, setlastName] = useState(user.last_name);
  const [id, setId] = useState(user.national_id);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone_number);
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [city, setCity] = useState(user.city);
  const [gender, setgender] = useState(user.gender === 0 ? "female" : "male");

  const handleUpdateUser = () => {
    console.log(password);
    const data = {
      first_name: firstName,
      last_name: lastName,
      national_id: id,
      email: email,
      password: password,
      phone_number: phone,
      city,
      gender: user.gender,
      birth_date: birthDate,
      image_name: image_name
    };
    axios.post(`${php}/update_patient_info/${user.id}`, data)
      .then((response) => {
        console.log('User information updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Failed to update user information:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser();
  };

  return (
    <>
      <div className="profile-container">
        <div className="image-container">
          <img className="image-profile" src={profileimg} alt="Profile" />
          <p className="image-name">{user.firstName} {user.lastName}</p>
        </div>
        <div className="info-container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="profile-label">First Name</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">Last Name</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">National ID</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={id}
                  disabled
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">Email</label>
              <div className="profile-content">
                <input
                  type="email"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">Phone</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">Birth Date</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={birthDate}
                  disabled
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">City</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="profile-label">Gender</label>
              <div className="profile-content">
                <input
                  type="text"
                  value={gender}
                  disabled
                  onChange={(e) => setgender(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn-profile">
              Save
            </button>
          </form>
          <hr className="hr-profile"></hr>
        </div>
      </div>
    </>
  );
};