const jwt = require('jsonwebtoken');

// Mock users for demonstration
const MOCK_USERS = [
    {
        id: 'student_123',
        email: 'student@uni.edu',
        password: 'password123',
        name: 'Alex Johnson',
        rollNumber: '2023CS101',
        role: 'STUDENT'
    },
    {
        id: 'faculty_123',
        email: 'faculty@uni.edu',
        password: 'password123',
        name: 'Dr. Sarah Smith',
        rollNumber: 'FACULTY_A1',
        role: 'FACULTY'
    },
    {
        id: 'admin_123',
        email: 'admin@uni.edu',
        password: 'password123',
        name: 'James Wilson',
        rollNumber: 'ADMIN_ROOT',
        role: 'ADMIN'
    },
    {
        id: '7376231cs116',
        email: 'arivazhagan.cs23@bitsathy.ac.in',
        password: 'bitsathy@10',
        name: 'Arivazhagan',
        rollNumber: '7376231CS116',
        role: 'STUDENT'
    }

];

exports.loginUser = async (email, password) => {
    // Validate credentials (mock)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    // Generate token
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

exports.getUserById = async (id) => {
    // Mock fetching user
    const user = MOCK_USERS.find(u => u.id === id);
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};

