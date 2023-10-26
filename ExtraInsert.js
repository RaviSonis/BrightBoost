// const mongoose = require('mongoose');
// const Tutor = require('./models/tutor'); // Import the pre-defined Tutor model

// // 1. Connect to MongoDB
// mongoose.connect('mongodb+srv://admin:admin123@projectcluster.twovgr9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Failed to connect to MongoDB', err));

// // 2. Insert demo data
// async function insertDemoData() {
//     const tutors = [
//         {
//             name: 'Example1',
//             expertise: 'Math',
//             mobileNumber: '1234567890',
//             username: 'Example1',
//             availability: ['Monday', 'Wednesday'],
//             password: 'password123',
//             role: 'tutor'
//         },
//         {
//             name: 'Admin',
//             expertise: 'Admin',
//             mobileNumber: '0987654321',
//             username: 'Adminmain',
//             password: 'Admin123@',
//             role: 'admin'
//         }
//         // Add more demo tutors as needed
//     ];

//     try {
//         await Tutor.insertMany(tutors);
//         console.log('Demo data inserted successfully.');
//     } catch (error) {
//         console.error('Error inserting demo data: ', error);
//     }
// }

// insertDemoData().then(() => {
//     // 3. Close the connection after the data has been inserted
//     mongoose.connection.close();
// });
