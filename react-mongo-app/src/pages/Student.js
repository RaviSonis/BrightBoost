import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logoImage from './bblogo.png';  // adjust the path and extension accordingly
const FormContainer = styled.form`
    max-width: 500px; 
    margin: 40px auto;  
    padding: 20px;  
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #ffffff; 
`;

const Logo = styled.img`
    position: fixed;
    top: 10px;
    left: 60px;
    width: 190px; // you can adjust this as per the size of your logo
    height: 120px; // you can adjust this too
    z-index: 1000; // to ensure the logo stays on top of other elements
    padding-:20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 7px;
    font-weight: 500;
    font-size: 15px;
    color: #333;
    margin-top: 15px;  
`;
const Title = styled.h1`  // Using h1 (or another heading) is more semantically correct for titles than "text"
    font-size: 22px;  // Slightly increased font size for prominence
    color: #007BFF;  // Used a slightly deeper shade of blue
    text-transform: uppercase;  // Made the text uppercase for a more title-like appearance
    letter-spacing: 1.2px;  // Added some letter spacing for better readability
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);  // Added a subtle text shadow for depth
    transition: color 0.2s;  // Smooth transition effect for color changes

    &:hover {
        color: #0056b3;  // Darker shade of blue on hover for interactivity
    }
`;



const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 5px 0;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    font-size: 16px;
    color: #555;
    transition: border 0.2s;
    
    &:focus {
        border-color: #007BFF;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    margin: 5px 0;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    font-size: 16px;
    color: #555;
    height: 150px;
    resize: vertical;
    transition: border 0.2s;

    &:focus {
        border-color: #007BFF;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    margin: 5px 0;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    font-size: 16px;
    color: #555;
    transition: border 0.2s;
    
    &:focus {
        border-color: #007BFF;
    }
`;

const PrimaryButton = styled.button`
  background-color: #007BFF;
  border: none;
  color: #FFFFFF;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #004999;
    transform: scale(1);
  }
`;

function Student() {
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [allDoubts, setAllDoubts] = useState([]); // Added state for all doubts
    const [formData, setFormData] = useState({
        studentID: '',
        sessionDate: '',
        sessionTime: '',
        subject: '',
        doubtTitle: '',
        doubtDetail: ''
    });
    const [filteredSessionTimes, setFilteredSessionTimes] = useState([]);

    const [submissionStatus, setSubmissionStatus] = useState({ success: false, message: '' });
    useEffect(() => {
        // Fetch students, sessions, and all doubts from your server or API
        axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
        axios.get('http://localhost:5000/api/sessions').then(res => setSessions(res.data));
        axios.get('http://localhost:5000/api/doubts').then(res => setAllDoubts(res.data));
    }, []);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === "studentID") {
            const selectedStudent = students.find(student => student.studentID === Number(value));
            if (selectedStudent) {
                setFormData(prevState => ({ ...prevState, studentName: selectedStudent.name }));
            }
        }

        if (name === "sessionDate") {
            const filteredSessions = sessions.filter(session => formatDate(session.sessionDate) === value);
            const times = filteredSessions.map(session => session.sessionTime);
            setFilteredSessionTimes(times); // Set the session times based on the selected date
        }
    };
    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const year = dateObj.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Adding doubtNo to formData
        const dataToSubmit = {
            ...formData,
            doubtNo: allDoubts.length + 1  // Use the length of allDoubts to set the doubtNo
        };

        axios.post('http://localhost:5000/api/doubts', dataToSubmit)
            .then(res => {
                console.log('Doubt submitted successfully:', res.data);
                setAllDoubts(prevDoubts => [...prevDoubts, dataToSubmit]); 
                console.log(allDoubts); // Add the new doubt to the allDoubts state
                setSubmissionStatus({ success: true, message: 'Doubt submitted successfully!' });
            })
            .catch(err => {
                console.error('Error submitting doubt:', err);
                setSubmissionStatus({ success: false, message: 'Error submitting doubt. Please try again.' });
            });
    };

    useEffect(() => {
        if (submissionStatus.message) {
            alert(submissionStatus.message);  // Show an alert based on the submission status
            setSubmissionStatus({ success: false, message: '' });  // Reset the submission status after showing the alert
        }
    }, [submissionStatus]);
    const uniqueSessionDates = [...new Set(sessions.map(session => formatDate(session.sessionDate)))];
    return (
        
        <FormContainer onSubmit={handleSubmit}>
            <Logo src={logoImage} alt="Logo" /> {/* this line adds the logo */}
            <Title><h1>CREATE DOUBT FORM </h1></Title>
            <Label>Student ID:</Label>
            <Select name="studentID" value={formData.studentID} onChange={handleChange}>
                <option value="" disabled>Select a student</option>
                {students.map(student => (
                    <option key={student.studentID} value={student.studentID}>{student.studentID}</option>
                ))}
            </Select>

            <Label>Student Name:</Label>
            <Input type="text" value={formData.studentName || ''} readOnly />

            <Label>Session Date:</Label>
            <Select name="sessionDate" value={formData.sessionDate} onChange={handleChange}>
                <option value="" disabled>Select a date</option>
                {uniqueSessionDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                ))}
            </Select>

            <Label>Session Time:</Label>
            <Select name="sessionTime" value={formData.sessionTime} onChange={handleChange}>
                <option value="" disabled>Select a time</option>
                {filteredSessionTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                ))}
            </Select>

            <Label>Subject:</Label>
            <Input type="text" name="subject" value={formData.subject} onChange={handleChange} />

            <Label>Doubt Title:</Label>
            <Input type="text" name="doubtTitle" value={formData.doubtTitle} onChange={handleChange} />

            <Label>Doubt Detail:</Label>
            <TextArea name="doubtDetail" value={formData.doubtDetail} onChange={handleChange}></TextArea>

            <PrimaryButton type="submit">Submit</PrimaryButton>
        </FormContainer>
    );
}

export default Student;