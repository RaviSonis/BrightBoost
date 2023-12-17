const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const Tutor = require('./models/tutor');
const Session = require('./models/Session');
const Doubt = require('./models/Doubt');

// This should be placed before your routes
app.use(cors());
// ... previous imports
const PORT = 5000;
app.use(express.json());

function generateAuthToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };
    const secretKey = 'Ravi'; // Please use a strong, unique secret key
    const options = { expiresIn: '1h' }; // Token expiration time
    return jwt.sign(payload, secretKey, options);
}

function getCurrentTutorFromToken(req) {
    const token = req.headers['authorization'];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, 'Ravi'); // Use your secret key
        return Tutor.findById(decoded.id);
    } catch (err) {
        return null;
    }
}

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Query the "tutors" collection for the provided username
        const tutor = await Tutor.findOne({ username });

        // Check if tutor is found and password is correct
        if (!tutor || password !== tutor.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If username and password are correct, proceed with token generation
        const token = generateAuthToken(tutor);

        res.json({ token, user: tutor });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error during login' });
    }
});

mongoose.connect('mongodb+srv://id:password@projectcluster.twovgr9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const Student = require('./models/Student');

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).send("Internal server error while fetching students.");
    }
});

// Add a student
app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).send("Internal server error while adding student.");
    }
});


// Delete a student
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});
// Edit a student
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error("Error editing student:", error);
        res.status(500).send("Internal server error while editing student.");
    }
});


// Endpoints for Tutors

// Fetch all tutors
app.get('/api/tutors', async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.json(tutors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tutors' });
    }
});

// Add a tutor
app.post('/api/tutors', async (req, res) => {
    try {
        const { name, expertise, mobileNumber, username, password } = req.body;

        // Create the tutor document with all relevant fields
        const tutor = new Tutor({
            name,
            expertise,
            mobileNumber,
            username,
            password,
            availability: [], // Add any other fields you need
        });

        console.log("New Tutor Created");
        await tutor.save();

        res.json(tutor);
    } catch (error) {
        console.error("Error creating tutor:", error);
        res.status(500).send("Internal server error while creating tutor.");
    }
});

// Delete a tutor
app.delete('/api/tutors/:id', async (req, res) => {
    try {
        await Tutor.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting tutor:", error);
        res.status(500).send("Internal server error while deleting tutor.");
    }
});

// Edit a tutor
app.put('/api/tutors/:id', async (req, res) => {
    try {
        const { expertise, mobileNumber, username, password } = req.body;
        const tutor = await Tutor.findByIdAndUpdate(req.params.id, {
            username,
            password, // Only send this if it's changed
            expertise,
            mobileNumber
        }, { new: true });
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor not found' });
        }
        res.json(tutor);
    } catch (error) {
        console.error("Error updating tutor:", error);
        res.status(500).send("Internal server error while updating tutor.");
    }
});

app.get('/api/tutor/current', async (req, res) => {
    console.log("Inside /api/tutor/current route");
    try {
        // Get the token from the request headers
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Assume the token has an id field for the tutor
        const decoded = jwt.verify(token, 'token');
        const tutorId = decoded.id;

        // Get the tutor's details using the token's ID
        const tutor = await Tutor.findById(tutorId);
        console.log(tutor);
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }
        res.json(tutor);

    } catch (error) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token has expired' });
        } else {
            return null;
        }
    }
});

app.post('/api/sessions', async (req, res) => {
    try {
        const session = new Session(req.body);
        await session.save();
        res.status(201).json(session);
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).send("Internal server error while creating session.");
    }
});

app.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await Session.find();
        res.json(sessions);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).send("Internal server error while fetching sessions.");
    }
});

app.get('/api/sessions/:id', async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).send("Internal server error while fetching session.");
    }
});

app.put('/api/sessions/:id', async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error) {
        console.error("Error updating session:", error);
        res.status(500).send("Internal server error while updating session.");
    }
});

app.delete('/api/sessions/:id', async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).send("Internal server error while deleting session.");
    }
});

app.get('/api/doubts', async (req, res) => {
    try {
        const doubt = await Doubt.find();
        res.json(doubt);
    } catch (error) {
        console.error("Error fetching Doubts:", error);
        res.status(500).send("Internal server error while fetching sessions.");
    }
});


// Route to submit doubts
app.post('/api/doubts', async (req, res) => {
    try {
        const doubt = new Doubt(req.body);
        await doubt.save();
        res.status(201).json(doubt);
    } catch (error) {
        console.error("Error submitting doubt:", error);
        res.status(500).send("Internal server error while submitting doubt.");
    }
});

app.get('/api/doubts/count', async (req, res) => {
    try {
        const count = await Doubt.countDocuments();
        console.log(count);
        res.json({ count });
    } catch (error) {
        console.error("Error fetching doubts count:", error);
        res.status(500).send("Internal server error while fetching doubts count.");
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
