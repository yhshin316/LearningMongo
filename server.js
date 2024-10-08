import express from 'express';

import { MongoClient } from 'mongodb';

import jwt from 'jsonwebtoken';

import cors from 'cors';

import bodyParser from 'body-parser';

const app = express();

const port = 5001;

// Middleware

app.use(cors());

app.use(bodyParser.json());

// MongoDB connection URI and client. Change the uri with your own connection string

const uri = 'mongodb+srv://yhshin316:6EFS8HwBZfw1oWxP@cluster0.civuo.mongodb.net/';

const client = new MongoClient(uri);

// JWT Secret

const JWT_SECRET = 'your-jwt-secret';

// Connect to MongoDB

client.connect().then(() => {

console.log('Connected to MongoDB');

}).catch(err => {

console.error('Failed to connect to MongoDB', err);

});

// Login Route

app.get('/loginCheck', async (req, res) => {

const user = req.query;
console.log(`Received login attempt: Username=${user.userID}`);

try {

const db = client.db('database');

const collection = db.collection('collection')

const existingUser = await collection.findOne({ userID: user.userID, password: user.password });

if(existingUser){
    return  res.status(200).json({ success: true, user: existingUser, message: 'Login Successful' });
}else{
    return res.status(400).json({ message: 'UserID or Password is wrong' });

}

//Error?
}catch(err){}});


// Find the user

//Write your code to check if user is in the database

// Signup Route

app.post('/signup', async (req, res) => {

const user = req.body

console.log(`Received signup attempt: Username=${user.userID}`);

try {

const db = client.db('database');

const collection = db.collection('collection')

// Check if username already exists

const existingUser = await collection.findOne({ userID: user.userID });

if (existingUser) {

    return res.status(400).json({ message: 'Username already exists' });

}else{
    await collection.insertOne(req.body)
}

//error?
}catch(err){
    console.error("Error during signup:", err);
    return res.status(500).json({ message: 'Internal server error' });
}});

// Insert new user into the database

//Write your code to insert a new user

// Start the server

app.listen(port, () => {

console.log(`Server running on http://localhost:${port}`);

});