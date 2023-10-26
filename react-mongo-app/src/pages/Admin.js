import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logoImage from './bblogo.png';  // adjust the path and extension accordingly
console.log('Admin component rendered');

const AdminContainer = styled.div`
width: 90%;
max-width: 1200px;
margin: 3rem auto;
padding: 2rem;
background-color: #f6f8fa;
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
font-family: Arial, sans-serif;
`;


const Button = styled.button`
padding: 0.5em 1em;
border: none;
border-radius: 5px;
background-color: #007BFF;
color: white;
transition: background-color 0.3s ease;

&:hover {
    background-color: #0056b3;
}
`;



const FormContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 2em;
`;

const StyledInput = styled.input`
flex: 1;
margin-right: 1em;
padding: 0.5em;
border: 1px solid #ccc;
border-radius: 5px;
`;



const StyledTable = styled.table`
width: 100%;
border-collapse: collapse;
`;




const ModalContent = styled.div`
background-color: #fff;
padding: 2em;
border-radius: 10px;
max-width: 500px;
width: 90%;
`;

const DoubtDetail = styled.div`
margin-bottom: 1em;
padding: 1em;
border: 1px solid #ddd;
border-radius: 5px;
`;
const tableRowStyles = {
    cursor: "pointer",
    transition: "background-color 0.3s"
};

const tableRowAlternateStyles = {
    backgroundColor: "#f7f7f7"
};

const tableCellStyles = {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    borderRight: "1px solid #ccc", // Border for individual cells
    textAlign: "center", // Center-align the content
    transition: "background-color 0.3s"
};

const buttonStyles = {
    padding: "5px 15px",
    margin: "0 5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s"
};

const buttonDangerStyles = {
    ...buttonStyles,
    backgroundColor: "#dc3545"
};

const PrimaryButton = styled(Button)`
background-color: #007BFF;
color: white;

&:hover {
    background-color: #0056b3;
}
`;


// AdminTitle
const AdminTitle = styled.h1`
font-size: 2em;
font-weight: bold;
color: #333;
margin-bottom: 16px;
margin-left: 500px;
`;

// SectionTitle
const SectionTitle = styled.h2`
font-size: 1.5em;
font-weight: bold;
color: #555;
margin-bottom: 12px;
`;

// SecondaryButton
const SecondaryButton = styled.button`
font-size: 1em;
padding: 8px 16px;
border: none;
background-color: #888;
color: #fff;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.2s;

&:hover {
    background-color: #666;
}
`;

// Modal
const Modal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 80%;
max-width: 400px;
padding: 16px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
z-index: 1000;
`;

// ModalTitle
const ModalTitle = styled.h3`
font-size: 1.4em;
font-weight: bold;
color: #444;
margin-bottom: 12px;
`;
const Logo = styled.img`
position: fixed;
top: 10px;
left: 10px;
width: 140px; // you can adjust this as per the size of your logo
height: 90px; // you can adjust this too
z-index: 1000; // to ensure the logo stays on top of other elements
padding-:20px;
`;
const LogoutButton = styled.button`
background-color: #f44336;  /* Red color for logout */
color: white;
padding: 10px 20px;
border: none;
border-radius: 4px;
cursor: pointer;
margin: 10px 1100px;
transition: background-color 0.3s;

&:hover {
    background-color: #d32f2f;
}
`;
function Admin() {

    const [students, setStudents] = useState([]);
    const [tutors, setTutors] = useState([]);
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [showTutorForm, setShowTutorForm] = useState(false);
    // States for forms
    const [studentName, setStudentName] = useState('');
    const [tutorName, setTutorName] = useState('');
    const [tutorExpertise, setTutorExpertise] = useState('');
    const [tutorMobile, setTutorMobile] = useState('');
    const [tutorUsername, setTutorUsername] = useState('');
    const [tutorPassword, setTutorPassword] = useState('');
    const [editingID, setEditingID] = useState(null);
    const [isEditingStudent, setIsEditingStudent] = useState(false);
    const [isEditingTutor, setIsEditingTutor] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [sessionNumber, setSessionNumber] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [sessionTutor, setSessionTutor] = useState('');
    const [sessionAttendance, setSessionAttendance] = useState('');
    const [sessionDoubt, setSessionDoubt] = useState('');
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoubt, setSelectedDoubt] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStudents();
        fetchTutors();
        fetchSessions(); // fetch sessions
    }, []);


    const fetchStudents = () => {
        axios.get('http://localhost:5000/api/students').then(response => {
            setStudents(response.data);
        });
    };

    const fetchTutors = () => {
        axios.get('http://localhost:5000/api/tutors').then(response => {
            setTutors(response.data);
        });
    };
    const fetchSessions = () => {
        axios.get('http://localhost:5000/api/sessions').then(response => {
            setSessions(response.data);
        });
    };
    useEffect(() => {
        axios.get('http://localhost:5000/api/doubts')
            .then(response => {
                setDoubts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
                setLoading(false);
            });
    }, []);
    if (loading) return <p>Loading...</p>;
    const handleDoubtCountClick = (sessionDate, sessionTime) => {
        // Filter doubts that have the same sessionDate and sessionTime as the session in question
        const matchingDoubts = doubts.filter(doubt => {
            return (
                (doubt.sessionDate) === (sessionDate) &&
                doubt.sessionTime === sessionTime
            );
        });

        // Set all matching doubts in the selectedDoubt state
        setSelectedDoubt(matchingDoubts);
        setIsModalOpen(true);
    };


    const filteredDoubts = (sessionDate, sessionTime) => {
        const formattedSessionDate = (sessionDate);

        const matchingDoubts = doubts.filter(doubt => {
            const formattedDoubtDate = (doubt.sessionDate);

            return formattedDoubtDate === formattedSessionDate && doubt.sessionTime === sessionTime;
        });

        return matchingDoubts.length;
    };

    const handleAddStudent = () => {
        const newStudentID = students.length + 1; // Calculate the new student ID
        axios.post('http://localhost:5000/api/students', {
            name: studentName,
            studentID: newStudentID // Send the new student ID to the backend
        })
            .then(() => {
                fetchStudents();
                setStudentName('');
            });
    };

    const handleEditStudent = (_id) => {
        const student = students.find(s => s._id === _id);
        setStudentName(student.name);
        setEditingID(_id);
        setShowStudentForm(true);
    };


    const handleDeleteStudent = (_id) => {
        axios.delete(`http://localhost:5000/api/students/${_id}`)
            .then(() => {
                fetchStudents();
            })
            .catch(error => {
                console.error("Error deleting student:", error);
            });
    };

    const handleAddTutor = () => {
        axios.post('http://localhost:5000/api/tutors', {
            name: tutorName,
            expertise: tutorExpertise,
            mobileNumber: tutorMobile,
            username: tutorUsername,
            password: tutorPassword
        })
            .then(() => {
                fetchTutors();
                setTutorName('');
                setTutorExpertise('');
                setTutorMobile('');
                setTutorUsername('');
                setTutorPassword('');
            });
    };

    const handleEditTutor = (id) => {
        const tutor = tutors.find(t => t._id === id);
        setTutorName(tutor.name);
        setTutorExpertise(tutor.expertise);
        setTutorMobile(tutor.mobileNumber);
        setTutorUsername(tutor.username);
        // We aren't setting the password for security reasons
        setEditingID(id);
        setIsEditingTutor(true);
        setShowTutorForm(true);
    };


    const handleDeleteTutor = (id) => {
        axios.delete(`http://localhost:5000/api/tutors/${id}`).then(() => {
            fetchTutors();
        });
    };

    const handleOpenAddStudentForm = () => {
        resetStudentForm(); // reset the form and flags
        setIsEditingStudent(false);
        setShowStudentForm(true);
    };

    const handleOpenAddTutorForm = () => {
        resetTutorForm(); // reset the form and flags
        setIsEditingTutor(false);
        setShowTutorForm(true);
    };

    const handleSubmitStudent = () => {
        if (editingID) {
            axios.put(`http://localhost:5000/api/students/${editingID}`, { name: studentName })
                .then(() => {
                    fetchStudents();
                    resetStudentForm();
                    setEditingID(null);
                })
                .catch(error => {
                    console.error("Error updating student:", error);
                });
        } else {
            // Find the student with the highest studentID
            const maxStudentID = students.reduce((max, student) => Math.max(max, student.studentID), 0);

            // Calculate the new student ID
            const newStudentID = maxStudentID + 1;

            axios.post('http://localhost:5000/api/students', {
                name: studentName,
                studentID: newStudentID // Send the new student ID to the backend
            })
                .then(() => {
                    fetchStudents();
                    resetStudentForm();
                })
                .catch(error => {
                    console.error("Error adding student:", error);
                });
        }
    };


    const handleSubmitTutor = () => {
        if (isEditingTutor) {
            axios.put(`http://localhost:5000/api/tutors/${editingID}`, {
                name: tutorName,
                expertise: tutorExpertise,
                mobileNumber: tutorMobile,
                username: tutorUsername,
                password: tutorPassword
            })
                .then(() => {
                    fetchTutors();
                    resetTutorForm();
                    setIsEditingTutor(false);
                });
        } else {
            handleAddTutor();
        }
    };
    const handleAddSession = () => {
        // Get the current date
        const today = new Date();
        const inputDate = new Date(sessionDate);

        // If the session date is before today, show an error and return
        if (inputDate < today) {
            alert("Session date cannot be in the past!");
            return;
        }

        // Submit the session data to the API
        axios.post('http://localhost:5000/api/sessions', {
            sessionDate: sessionDate,
            sessionTime: sessionTime,
            tutor: sessionTutor, // Assuming the ObjectId is provided in the sessionTutor state
            attendance: sessionAttendance,
            doubts: sessionDoubt
        })
            .then(() => {
                fetchSessions();
                resetSessionForm();
            })
            .catch(error => {
                console.error("Error adding session:", error);
            });
    };

    const handleDeleteSession = (_id) => {
        axios.delete(`http://localhost:5000/api/sessions/${_id}`).then(() => {
            fetchSessions();
        });
    };

    const resetSessionForm = () => {
        setSessionNumber('');
        setSessionDate('');
        setSessionTime('');
        setSessionTutor('');
        setSessionAttendance('');
        setSessionDoubt('');
        setShowSessionForm(false);
    };


    const resetStudentForm = () => {
        setStudentName('');
        setShowStudentForm(false);
    };

    const resetTutorForm = () => {
        setTutorName('');
        setTutorExpertise('');
        setTutorMobile('');
        setTutorUsername('');
        setTutorPassword('');
        setShowTutorForm(false);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDoubt(null); // Clear selected doubt
    };
    function handleLogout() {
        // Clear JWT token
        localStorage.removeItem('jwt'); // assuming the JWT token is stored in local storage

        // Optionally, if you're storing the JWT in a cookie, you can clear it as follows:
        // document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirect to login page
        window.location.href = '/login';
    }

    return (
        <AdminContainer>
            <Logo src={logoImage} alt="Logo" /> {/* this line adds the logo */}
            <AdminTitle>Admin Page</AdminTitle>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <SectionTitle>Students</SectionTitle>
            <PrimaryButton onClick={showStudentForm ? () => setShowStudentForm(false) : handleOpenAddStudentForm}>
                {showStudentForm ? "Cancel" : "Add Student"}
            </PrimaryButton>

            {showStudentForm && (
                <FormContainer>
                    <StyledInput
                        type="text"
                        placeholder="Student Name"
                        value={studentName}
                        onChange={e => setStudentName(e.target.value)}
                    />
                    <SecondaryButton onClick={handleSubmitStudent}>
                        {editingID ? 'Update' : 'Add'}
                    </SecondaryButton>
                </FormContainer>
            )}

            <StyledTable>
                <thead>
                    <tr>
                        <th style={tableCellStyles}>Name</th>
                        <th style={tableCellStyles}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr style={index % 2 === 0 ? tableRowAlternateStyles : tableRowStyles} key={index}>
                            <td style={tableCellStyles}>{student.name}</td>
                            <td style={tableCellStyles}>
                                <button style={buttonStyles} onClick={() => handleEditStudent(student._id)}>Edit</button>
                                <button style={buttonDangerStyles} onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </StyledTable>

            <SectionTitle>Tutors</SectionTitle>
            <PrimaryButton onClick={showTutorForm ? () => setShowTutorForm(false) : handleOpenAddTutorForm}>
                {showTutorForm ? "Cancel" : "Add Tutor"}
            </PrimaryButton>


            {showTutorForm && (
                <FormContainer>
                    <input
                        type="text"
                        placeholder="Tutor Name"
                        value={tutorName}
                        onChange={e => setTutorName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tutor Expertise"
                        value={tutorExpertise}
                        onChange={e => setTutorExpertise(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tutor Mobile"
                        value={tutorMobile}
                        onChange={e => setTutorMobile(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Tutor Username"
                        value={tutorUsername}
                        onChange={(e) => setTutorUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Tutor Password"
                        value={tutorPassword}
                        onChange={(e) => setTutorPassword(e.target.value)}
                    />
                    <button onClick={handleSubmitTutor}>{isEditingTutor ? 'Update' : 'Add'}</button>
                </FormContainer>
            )}

            {/* Tutors Table */}
            <StyledTable>
                <thead>
                    <tr>
                        <th style={tableCellStyles}>Name</th>
                        <th style={tableCellStyles}>Expertise</th>
                        <th style={tableCellStyles}>Mobile</th>
                        <th style={tableCellStyles}>Username</th>
                        <th style={tableCellStyles}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tutors.map((tutor, index) => (
                        <tr style={index % 2 === 0 ? tableRowAlternateStyles : tableRowStyles} key={index}>
                            <td style={tableCellStyles}>{tutor.name}</td>
                            <td style={tableCellStyles}>{tutor.expertise}</td>
                            <td style={tableCellStyles}>{tutor.mobileNumber}</td>
                            <td style={tableCellStyles}>{tutor.username}</td>
                            <td style={tableCellStyles}>
                                <button style={buttonStyles} onClick={() => handleEditTutor(tutor._id, tutor.name, tutor.expertise, tutor.mobileNumber)}>Edit</button>
                                <button style={buttonDangerStyles} onClick={() => handleDeleteTutor(tutor._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>

            <SectionTitle>Sessions</SectionTitle>
            <PrimaryButton onClick={() => setShowSessionForm(!showSessionForm)}>
                {showSessionForm ? "Cancel" : "Add Session"}
            </PrimaryButton>

            {showSessionForm && (
                <FormContainer>
                    <input
                        type="date"
                        placeholder="Session Date"
                        value={sessionDate}
                        onChange={e => setSessionDate(e.target.value)}
                    />
                    <select
                        value={sessionTime}
                        onChange={e => setSessionTime(e.target.value)}>
                        <option value="">Please select a time</option> {/* Add this line */}
                        <option value="3:30 - 4:30">3:30 - 4:30</option>
                        <option value="4:30 - 5:30">4:30 - 5:30</option>
                    </select>
                    <select
                        value={sessionTutor}
                        onChange={e => setSessionTutor(e.target.value)}>
                        <option value="">Please select a tutor</option>
                        {tutors.map(tutor => (
                            <option key={tutor._id} value={tutor.name}>{tutor.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Session Attendance"
                        value={sessionAttendance}
                        onChange={e => setSessionAttendance(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Session Doubts"
                        value={sessionDoubt}
                        onChange={e => setSessionDoubt(e.target.value)}
                    />
                    <button onClick={handleAddSession}>Add Session</button>
                </FormContainer>
            )}

            <StyledTable>
                <thead>
                    <tr>
                        <th style={tableCellStyles}>Session Number</th>
                        <th style={tableCellStyles}>Date</th>
                        <th style={tableCellStyles}>Time</th>
                        <th style={tableCellStyles}>Tutor</th>
                        <th style={tableCellStyles}>Attendance</th>
                        <th style={tableCellStyles}>Doubt</th>
                        <th style={tableCellStyles}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => {
                        // Formatting the date
                        const dateObj = new Date(session.sessionDate);
                        const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;

                        // Session number (index + 1 because arrays are 0-indexed)
                        const sessionNumber = index + 1;

                        return (
                            <tr key={index}>
                                <td style={tableCellStyles}>{sessionNumber}</td>
                                <td style={tableCellStyles}>{formattedDate}</td>
                                <td style={tableCellStyles}>{session.sessionTime}</td>
                                <td style={tableCellStyles}>{session.tutor}</td>
                                <td style={tableCellStyles}>{session.attendance}</td>
                                <td style={tableCellStyles}> <span style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={() => handleDoubtCountClick(formattedDate, session.sessionTime)}>
                                    {filteredDoubts(formattedDate, session.sessionTime)}
                                </span></td>
                                <td style={tableCellStyles}>
                                    <button style={buttonDangerStyles} onClick={() => handleDeleteSession(session._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>

            {isModalOpen && (
                <Modal>
                    <ModalContent>

                        <ModalTitle>Doubt Details</ModalTitle>
                        {selectedDoubt.map((doubt, index) => (
                            <DoubtDetail key={index}>
                                <p><strong>Student Name:</strong> {doubt.studentName}</p>
                                <p><strong>Subject:</strong> {doubt.subject}</p>
                                <p><strong>Doubt Title:</strong> {doubt.doubtTitle}</p>
                                <p><strong>Doubt Detail:</strong> {doubt.doubtDetail}</p>
                            </DoubtDetail>
                        ))}
                        <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                    </ModalContent>
                </Modal>
            )}
        </AdminContainer>
    );
}

export default Admin;