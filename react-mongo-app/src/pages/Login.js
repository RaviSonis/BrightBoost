import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from './bblogo.png';  // adjust the path and extension accordingly

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e5e5e5;
`;

const Logo = styled.img`
    position: fixed;
    top: 160px;
    left: 680px;
    width: 190px; // you can adjust this as per the size of your logo
    height: 120px; // you can adjust this too
    z-index: 1000; // to ensure the logo stays on top of other elements
    padding-:20px;
`;

const LoginForm = styled.form`
    width: 400px;
    padding: 40px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const Title = styled.h1`
    text-align: center;
    font-size:25px;
    padding-top:20px;
    color:white;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const InputContainer = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const LoginButton = styled.button`
width: 30%;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    margin-top: 20px; // Adds space above the button
    margin-left: 145px; // Aligns the button to the right

    &:hover {
        background-color: white;
        color: #4CAF50;
    }
`;
const SubmitButton = styled.button`
    width: 30%;
    padding: 5px 10px;
    background-color: white;
    color: #4CAF50;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    margin-top: 20px; // Adds space above the button
    margin-left: 290px; // Aligns the button to the right

    &:hover {
        background-color: #4CAF50;
        color: white;
    }
`;



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const { token, user } = response.data;

            // Save the token to local storage
            localStorage.setItem('token', token);

            // Navigate based on role
            if (user.role === 'admin') {

                navigate('/admin');
            } else if (user.role === 'tutor') {
                navigate('/tutor');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data);
            setErrorMsg('Invalid credentials. Please try again.');
        }
    };

    return (
        <Container>
            <Logo src={logoImage} alt="Logo" /> {/* this line adds the logo */}
            <LoginForm onSubmit={handleSubmit}>
                <Title>Login Page</Title>
                {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                <InputContainer>
                    <Label>Username:</Label>
                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </InputContainer>
                <InputContainer>
                    <Label>Password:</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </InputContainer>
                <LoginButton type="submit">Login</LoginButton>
                <SubmitButton onClick={() => navigate('/student')}>Student Portal</SubmitButton>
            </LoginForm>
        </Container>
    );
}

export default Login;
