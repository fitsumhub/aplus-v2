const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:30000';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB server');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;

// the below code fragment can be found in:

// the below code fragment can be found in:

