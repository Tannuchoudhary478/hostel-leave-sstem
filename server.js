const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// CORS Settings - ब्राउज़र एरर रोकने के लिए
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// 1. DATABASE CONNECTION BYPASS
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1/hostelLeaveDB";
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("MongoDB Database Connected Successfully! 🍃"))
    .catch((err) => {
        console.log("Database connection bypass enabled. 🚀");
        console.log("Server status: Ready for API Testing!");
    });

// 2. REGISTRATION API
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email } = req.body;
        res.status(201).json({ 
            success: true, 
            message: "Student registered successfully! 🎉 (API Testing Mode Live)",
            data: { fullName, email }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});

// 3. LOGIN API
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        res.json({
            success: true,
            message: "Login successful! Welcome back. 🚀",
            token: "dummy_jwt_token_for_testing",
            user: { fullName: "Divya Kumari", role: "Student" }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
// 4. APPLY LEAVE API (छुट्टी के लिए आवेदन रूट)
app.post('/api/leave/apply', async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;
        
        // एपीआई टेस्टिंग के लिए सक्सेस रिस्पॉन्स भेजना
        res.status(201).json({
            success: true,
            message: "Leave application submitted successfully! 📝 (Waiting for approval)",
            data: { leaveType, startDate, endDate, reason }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});
// 5. LEAVE APPROVAL API (वार्डन द्वारा अप्रूव या रिजेक्ट करने का रूट)
app.post('/api/leave/action', async (req, res) => {
    try {
        const { leaveId, action } = req.body; // action में 'Approved' या 'Rejected' आएगा
        
        res.json({
            success: true,
            message: `Leave application has been ${action} successfully! 🔔`,
            status: action
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});