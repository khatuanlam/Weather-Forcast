const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Initialize Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Setup (using mongoose)
mongoose.connect('mongodb://localhost/weatherApp', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { email: String, subscriptionToken: String, subscribed: Boolean });

// WeatherAPI.com API Key
const WEATHER_API_KEY = 'your_weatherapi_key';

// Axios instance for WeatherAPI.com requests
const weatherApi = axios.create({
    baseURL: 'http://api.weatherapi.com/v1/',
    params: {
        key: WEATHER_API_KEY
    }
});

// Email transport setup (using nodemailer, replace with your SMTP settings)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

// API endpoints
app.get('/api/weather/current', async (req, res) => {
    const { location } = req.query;
    try {
        const response = await weatherApi.get('/current.json', {
            params: { q: location }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch current weather' });
    }
});

app.get('/api/weather/forecast', async (req, res) => {
    const { location } = req.query;
    try {
        const response = await weatherApi.get('/forecast.json', {
            params: { q: location, days: 4 }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather forecast' });
    }
});

app.post('/api/user/register', async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const subscriptionToken = uuidv4();
        const newUser = new User({ email, subscriptionToken, subscribed: false });
        await newUser.save();

        // Send confirmation email
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Confirm Subscription',
            text: `Click the link to confirm your subscription: http://localhost:3000/confirm/${subscriptionToken}`
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: 'Registration successful. Please check your email for confirmation.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.post('/api/user/confirm', async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOneAndUpdate({ subscriptionToken: token }, { subscribed: true });
        if (!user) {
            return res.status(404).json({ error: 'Token not found' });
        }
        res.json({ message: 'Subscription confirmed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to confirm subscription' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});