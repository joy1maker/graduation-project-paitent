import React, { useContext } from "react";
import './Ask.css';
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import URLS from "../../Assets/apiUrl";

export const Ask = () => {
  const location = useLocation();
  const doctor = location.state;
  const { user } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [question, setQuestion] = useState("");
  const [titleQuestion, setTitleQuestion] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const { php } = URLS;
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleTextChange = (event) => {
    setQuestion(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleQuestion(event.target.value);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const sendQuestion = async () => {
    const userQuestion = {
      "title": titleQuestion,
      "body": question,
      "attatchments": "[]",
      "patient_id": user.id,
      "doctor_id": doctor.id,
      "status": 0,
      "category": selectedOption
    }
    const response = await axios.post(`${php}/make-question`, userQuestion);
    return response.data;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuestion();
    setSuccess(true);
  }

  return (
    <>
      <div className="chat-page">
        <div className="chat-container">
          <div className="chat-header">
            <h2 className="h-ask">Ask Your Question</h2>
            <p className="p1-ask">Free Consultation</p>
            <p className="p2-ask">our Doctors here for your help and answering your question</p>
          </div>
          <div className="chat-body">
            <form onSubmit={handleSubmit}>
              <div className="title-department">
                <input className="question-title" type="text" placeholder="Question Title" value={titleQuestion} onChange={handleTitleChange} required></input>
                &nbsp; &nbsp;
                <select value={selectedOption} onChange={handleOptionChange} className="question-department">
                  <option value="">Select a catigore</option>
                  {
                    doctor.categories.map(
                      (cat) => <option value={cat}>{cat}</option>
                    )
                  }

                </select>
              </div>
              <br />

              <br />
              <div className="question-area">
                <textarea className="text-question-area" value={question} onChange={handleTextChange} placeholder="Enter Your Question" rows="6" cols="50" required />
              </div>
              <br />
              <div className="upload-attachment">
                <input type="file" onChange={handleFileChange} />
              </div>
              <input type="submit" className="btn-ask" value="Send"></input>
            </form>

          </div>
          <div>
            {success && <p className="send-message">Question Send successfully Please make sure to check your email regularly as we will be sending the response !</p>}
          </div>
        </div>
      </div>
    </>
  )
}