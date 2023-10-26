import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logoImage from './bblogo.png';  // adjust the path and extension accordingly
const PageContainer = styled.div`
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f4f4f4;
    border-radius: 8px;
`;

const Heading = styled.h1`
    font-size: 24px;
    color: #333;
    border-bottom: 2px solid #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
`;

const TutorDetails = styled.div`
    font-family: 'Arial', sans-serif;
    width: 100%;
    max-width: 400px;  // Adjust based on your layout
    margin: 20px auto;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    div {
        margin-bottom: 15px;
        position: relative;

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            font-size: 16px;
            transition: border-color 0.3s;

            &:focus {
                border-color: #007BFF;
                outline: none;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            }
        }

        input[type="password"]::placeholder {
            font-style: italic;
        }
    }
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
const TutorDetailField = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Label = styled.label`
    font-weight: bold;
    flex: 1;
`;

const Input = styled.input`
    flex: 2;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
        outline-color: #4CAF50;
    }
`;

const Button = styled.button`
    padding: 10px 15px;
    border: none;
    background-color: #4CAF50;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #45a049;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    th, td {
        padding: 8px 12px;
        border: 1px solid #ddd;
    }
    th {
        background-color: #4CAF50;
        color: white;
    }
`;

const DoubtDetail = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 5px;
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
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

const SecondaryButton = styled(PrimaryButton)`
  background-color: #6C757D;
  &:hover {
    background-color: #5a6268;
  }
  &:active {
    background-color: #495057;
  }
`;
const CloseButton = styled.button`
  background-color: red;
  color: #FFFFFF;
  border: none;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #FF5F5F;
    transform: scale(1.05);
  }

  &:active {
    background-color: #FF2F2F;
    transform: scale(1);
  }

  &:before, &:after {
    content: '';
    background-color: #FFFFFF;
    height: 2px;
    width: 18px;
    position: absolute;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
const CloseButton2 = styled.button`
  background-color: red;
  color: #FFFFFF;
  border: none;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #FF5F5F;
    transform: scale(1.05);
  }

  &:active {
    background-color: #FF2F2F;
    transform: scale(1);
  }

  &:before, &:after {
    content: '';
    background-color: #FFFFFF;
    height: 2px;
    width: 18px;
    position: absolute;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const SessionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
`;

const SessionTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;

const StyledTable = styled.table`
    width: 80%;  // Adjust as needed
    border-collapse: collapse;
    th, td {
        padding: 10px 15px;
        border: 1px solid #ddd;
    }
    th {
        background-color: #4CAF50;
        color: white;
    }
    td {
        text-align: center;
    }
`;
const HeaderContainer = styled.text`
    display: flex;
    justify-content: space-between; /* This will push the two elements to the ends of the container */
    align-items: center; /* This will vertically align the two elements in the center */
`

const LogoutButton = styled.button`
    background-color: #f44336;  /* Red color for logout */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 20px 0;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d32f2f;
    }
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    width: 90%;
    max-width: 600px;
    border-radius: 8px;
`;
function Tutor() {

    const [tutor, setTutor] = useState({});
    const [sessions, setSessions] = useState([]);
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [updatedAttendance, setUpdatedAttendance] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [expertise, setExpertise] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [doubts, setDoubts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoubt, setSelectedDoubt] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token').trim();

        Promise.all([
            axios.get('http://localhost:5000/api/tutor/current', { headers: { 'Authorization': `Bearer ${token}` } }),
            axios.get('http://localhost:5000/api/sessions', { headers: { 'Authorization': `Bearer ${token}` } }),
            axios.get('http://localhost:5000/api/doubts', { headers: { 'Authorization': `Bearer ${token}` } })
        ]).then(([tutorResponse, sessionResponse, doubtsResponse]) => {
            // handle tutor response
            if (tutorResponse.data) {
                setTutor(tutorResponse.data);
                setUsername(tutorResponse.data.username);
                setExpertise(tutorResponse.data.expertise);
                setMobileNumber(tutorResponse.data.mobileNumber);
            } else {
                console.error("Received unexpected data structure:", tutorResponse);
            }

            // handle session response
            if (Array.isArray(sessionResponse.data)) {
                setSessions(sessionResponse.data);
            } else {
                console.error("Received unexpected data structure:", sessionResponse);
            }

            // handle doubts response
            if (Array.isArray(doubtsResponse.data)) {
                setDoubts(doubtsResponse.data);

                const updatedSessions = sessionResponse.data.map(session => {
                    const matchedDoubt = doubtsResponse.data.find(doubt =>
                        convertToISOFormat(doubt.sessionDate) === convertToISOFormat(session.date)
                    );
                    return {
                        ...session,
                        doubts: matchedDoubt ? [matchedDoubt] : []
                    };
                });
                setSessions(updatedSessions);
            } else {
                console.error("Received unexpected data structure:", doubtsResponse);
            }

            setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        });
    }, []);

    const convertToISOFormat = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };
    const formatDateToDMY = (date) => {
        if (!date) {
            return ''; // Handle empty date gracefully
        }

        const d = new Date(date);

        if (isNaN(d)) {
            return `${date}`;
        }

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    };


    const getDoubtsForSession = (sessionDate, sessionTime) => {
        const formattedSessionDate = formatDateToDMY(sessionDate);

        const matchingDoubts = doubts.filter(doubt => {
            const formattedDoubtDate = formatDateToDMY(doubt.sessionDate);

            return formattedDoubtDate === formattedSessionDate && doubt.sessionTime === sessionTime;
        });

        return matchingDoubts.length;
    };



    const handleSaveChanges = () => {
        // Update the tutor's details
        axios.put(`http://localhost:5000/api/tutors/${tutor._id}`, {
            username,
            password, 
            expertise,
            mobileNumber
        })
        .then(response => {
            setTutor(response.data);
            alert("Updated Successfully!");
        })
        .catch(error => {
            console.error("Error updating tutor details:", error);
        });
    };
    
    const handleStartEditAttendance = (sessionId) => {
        setEditingSessionId(sessionId);
    };

    const handleCancelEditAttendance = () => {
        setEditingSessionId(null);
    };
    const handleUpdateSessionAttendance = (sessionId) => {
        const attendance = updatedAttendance[sessionId];
        if (!attendance) return;

        axios.put(`http://localhost:5000/api/sessions/${sessionId}`, {
            attendance: attendance
        })
            .then(response => {
                // Update sessions state with new attendance data
                const updatedSessions = sessions.map(session => {
                    if (session._id === sessionId) {
                        return { ...session, attendance: attendance };
                    }
                    return session;
                });
                setSessions(updatedSessions);
                setEditingSessionId(null);
                alert("Data updated!"); // Prompt after completion
            })
            .catch(error => {
                console.error("Error updating session attendance:", error);
            });
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }
    const handleDoubtCountClick = (sessionDate, sessionTime) => {
        // Filter doubts that have the same sessionDate and sessionTime as the session in question
        const matchingDoubts = doubts.filter(doubt => {
            return (
                formatDateToDMY(doubt.sessionDate) === formatDateToDMY(sessionDate) &&
                doubt.sessionTime === sessionTime
            );
        });

        // Set all matching doubts in the selectedDoubt state
        setSelectedDoubt(matchingDoubts);
        setIsModalOpen(true);
    };

    // Function to close the modal
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
        <PageContainer>
            <Logo src={logoImage} alt="Logo" /> {/* this line adds the logo */}
            <HeaderContainer>
                <Heading>Welcome, {tutor.name}</Heading>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </HeaderContainer>

            <TutorDetails>
                <Heading>Edit your Profile here</Heading>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password (leave blank to keep unchanged):</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Expertise:</label>
                    <input
                        type="text"
                        value={expertise}
                        onChange={e => setExpertise(e.target.value)}
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="tel"
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value)}
                    />
                </div>
            </TutorDetails>
            <PrimaryButton onClick={handleSaveChanges}>Save Changes</PrimaryButton>
            <SessionsContainer>
                <SessionTitle>Sessions</SessionTitle>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Attendance</th>
                            <th>Doubts</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.filter(session => session.tutor === tutor.name).map(filteredSession => (
                            <tr key={filteredSession._id}>
                                <td>{formatDateToDMY(filteredSession.sessionDate)}</td>
                                <td>{filteredSession.sessionTime}</td>
                                <td>
                                    {editingSessionId === filteredSession._id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={updatedAttendance[filteredSession._id] || filteredSession.attendance}
                                                onChange={e => setUpdatedAttendance({ ...updatedAttendance, [filteredSession._id]: e.target.value })}
                                            />
                                            <CloseButton2 onClick={handleCancelEditAttendance}></CloseButton2>
                                        </>
                                    ) : filteredSession.attendance}
                                </td>
                                <td>
                                    <span
                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={() => handleDoubtCountClick(filteredSession.sessionDate, filteredSession.sessionTime)}
                                    >
                                        {getDoubtsForSession(filteredSession.sessionDate, filteredSession.sessionTime)}
                                    </span>
                                </td>
                                <td>
                                    {editingSessionId === filteredSession._id ? (
                                        <SecondaryButton onClick={() => handleUpdateSessionAttendance(filteredSession._id)}>Save</SecondaryButton>
                                    ) : (
                                        <SecondaryButton onClick={() => handleStartEditAttendance(filteredSession._id)}>Update</SecondaryButton>
                                    )}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </StyledTable>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Doubt Details</h2>
                            {selectedDoubt.map((doubt, index) => (
                                <DoubtDetail key={index}>
                                    <p><strong>Student Name:</strong> {doubt.studentName}</p>
                                    <p><strong>Subject:</strong> {doubt.subject}</p>
                                    <p><strong>Doubt Title:</strong> {doubt.doubtTitle}</p>
                                    <p><strong>Doubt Detail:</strong> {doubt.doubtDetail}</p>
                                </DoubtDetail>
                            ))}
                            <CloseButton onClick={closeModal}></CloseButton>
                        </div>
                    </div>
                )}

            </SessionsContainer>

        </PageContainer>

    )
};


export default Tutor;
