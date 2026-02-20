const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./sharedModules/auth/auth.routes');
const myGroupRoutes = require('./studentModules/myGroup/myGroup.routes');
const groupsRoutes = require('./studentModules/groups/groups.routes');
const rankingsRoutes = require('./studentModules/rankings/rankings.routes');
const eventsRoutes = require('./studentModules/events/events.routes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5174', // Adjust to your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/my-group', myGroupRoutes);
app.use('/api/v1/groups', groupsRoutes);
app.use('/api/v1/rankings', rankingsRoutes);
app.use('/api/v1/events', eventsRoutes);

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
