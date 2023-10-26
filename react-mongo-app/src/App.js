import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Tutor from './pages/Tutor';
import Student from './pages/Student';
import ProtectedRoute from './ProtectedRoute';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                } />
                <Route path="/tutor" element={
                    <ProtectedRoute>
                        <Tutor />
                    </ProtectedRoute>
                } />
                <Route path="/student" element={<Student />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
