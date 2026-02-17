const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./api/routes/auth.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Adjust to your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;
