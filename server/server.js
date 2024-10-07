const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.NEXT_PUBLIC_URL
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Running');
});

app.use('/countries', countryRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});