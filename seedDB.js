const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://id:password@projectcluster.twovgr9.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('test'); // Replace with your database name

        // Specify the data to be inserted
        const dataToInsert = {
            username: 'id',
            password: 'password',
            role: 'admin'
        };

        // Insert the data into the "tutors" collection
        const result = await db.collection('tutors').insertOne(dataToInsert);

        console.log(`Inserted ${result.insertedCount} document into the "tutors" collection.`);
    } catch (error) {
        console.error('Error inserting document:', error);
    } finally {
        // Close the MongoDB connection
        client.close();
        console.log('MongoDB connection closed.');
    }
}

insertData();
