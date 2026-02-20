require('dotenv').config();
// Server restarted to apply updates (Error Handling)
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { Resend } = require('resend');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Track DB connection status
let dbConnected = false;
let mockJobSettings = [
    { role_id: 'fulltime', is_hiring: true, label: 'Full-time' },
    { role_id: 'internship', is_hiring: true, label: 'Internship' },
    { role_id: 'freelance', is_hiring: true, label: 'Freelance' }
];

// Database Connection
// Database Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || process.env.DB_NAME || 'shyamvertex_db',
    port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.log('---------------------------------------------------');
        console.log('Using IN-MEMORY STORAGE (Fallback Mode).');
        console.log('---------------------------------------------------');
        dbConnected = false;
        return;
    }
    console.log('Connected to MySQL database.');
    dbConnected = true;
});

// Email Configuration (Resend API)
// Using hardcoded key for immediate testing, but prefer env var in production
const resend = new Resend(process.env.RESEND_API_KEY || 're_94jjDUZm_299jpxcCAs3gWPNysZ17CjhQ');

// Routes
app.get('/', (req, res) => {
    res.send('Shyam Vertex API is running');
});

// ... (skipping contact form route for brevity, focus on apply route)



// Routes
app.get('/', (req, res) => {
    res.send('Shyam Vertex API is running');
});

// Contact Form Submission Route
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // 1. Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const query = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) console.error('DB Error:', err);
    });

    // 2. Send Emails (Resend API)
    // Using async/await inside the route handler
    (async () => {
        try {
            // Admin Notification (Priority)
            const adminData = await resend.emails.send({
                from: 'Shyam Vertex <onboarding@resend.dev>',
                to: 'pushpa30102040@gmail.com', // Restricted to this address in Resend Testing Mode
                subject: `New Contact Message: ${subject} - ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #022c22; text-align: center;">New Contact Message</h2>
                        <hr style="border: 0; border-top: 2px solid #D4AF37; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #022c22; margin-top: 20px;">
                            <p><strong>Message:</strong></p>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Sent from Shyam Vertex Website via Resend</p>
                    </div>
                `
            });

            if (adminData.error) console.error('Resend Admin Contact Error:', adminData.error);

            // Acknowledgment (Best Effort)
            if (email) {
                try {
                    await resend.emails.send({
                        from: 'Shyam Vertex <onboarding@resend.dev>',
                        to: email,
                        subject: 'We Received Your Message - Shyam Vertex',
                        html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2 style="color: #022c22;">Message Received</h2>
                            <p>Hello ${name},</p>
                            <p>Thank you for contacting us. We have received your message regarding "<strong>${subject}</strong>".</p>
                            <p>Our team will get back to you shortly.</p>
                            <br>
                            <p>Best Regards,<br>Shyam Vertex Team</p>
                        </div>
                    `
                    });
                } catch (ackErr) {
                    console.warn('Resend Ack Contact Failed:', ackErr.message);
                }
            }

            // Success response
            return res.status(200).json({ message: 'Message sent successfully' });

        } catch (error) {
            console.error('Error sending contact emails:', error);
            // Still return success for UX
            return res.status(200).json({ message: 'Message sent successfully' });
        }
    })();
});

// --- Job Settings API ---

// Get all job statuses
app.get('/api/jobs', (req, res) => {
    if (!dbConnected) {
        console.log('Serving jobs from memory (Fallback)');
        return res.json(mockJobSettings);
    }
    const query = 'SELECT * FROM job_settings';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching job settings:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});

// Update job status (Admin)
app.post('/api/jobs/update', (req, res) => {
    const { role_id, is_hiring } = req.body;

    if (!role_id || is_hiring === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!dbConnected) {
        console.log(`Updating job status in memory (Fallback): ${role_id} -> ${is_hiring}`);
        mockJobSettings = mockJobSettings.map(job =>
            job.role_id === role_id ? { ...job, is_hiring } : job
        );
        return res.json({ message: 'Job status updated successfully (In-Memory)' });
    }

    const query = 'UPDATE job_settings SET is_hiring = ? WHERE role_id = ?';
    db.query(query, [is_hiring, role_id], (err, result) => {
        if (err) {
            console.error('Error updating job status:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ message: 'Job status updated successfully' });
    });
});

// Application Submission Route
app.post('/api/apply', upload.single('resume'), async (req, res) => {
    try {
        const { name, mobile, email, experience, projects, role, skills, portfolio } = req.body;
        const resumePath = req.file ? req.file.path : null;

        console.log(`Received application for ${role} from ${name}`);

        // 1. Database Insertion (Only if connected)
        if (dbConnected) {
            const query = 'INSERT INTO applications (name, mobile, email, experience, projects, role, skills, portfolio, resume_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(query, [name, mobile, email, experience, projects, role, skills, portfolio, resumePath], (err, result) => {
                if (err) {
                    console.error('Error saving application to database:', err);
                } else {
                    console.log('Application saved to database with ID:', result.insertId);
                }
            });
        } else {
            console.warn('Database not connected. Skipping DB insertion for application.');
        }

        // 2. Email Configuration Check
        // Resend is initialized globally, but good to ensure we have a key
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY missing. Using fallback or skipping.');
            // Proceeding because we likely have the hardcoded fallback
        }

        // 3. Email Sending (Resend API)
        try {
            // Admin Notification (Priority)
            const adminContent = `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #022c22; text-align: center;">New Application Received</h2>
                    <hr style="border: 0; border-top: 2px solid #D4AF37; margin: 20px 0;">
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Experience:</strong> ${experience}</p>
                    <p><strong>Skills:</strong> ${skills || 'Not specified'}</p>
                    ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #022c22; margin-top: 20px;">
                        <p><strong>Projects / Details:</strong></p>
                        <p>${(projects || '').replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Sent from Shyam Vertex Website via Resend</p>
                </div>
            `;

            const adminAttachments = resumePath ? [{
                filename: path.basename(resumePath),
                content: fs.readFileSync(resumePath)
            }] : [];

            // Execute Admin Email
            const adminData = await resend.emails.send({
                from: 'Shyam Vertex <onboarding@resend.dev>',
                to: 'pushpa30102040@gmail.com', // Restricted to this address in Resend Testing Mode // Guaranteed to work if this is the account owner
                subject: `New Job Application: ${role} - ${name}`,
                html: adminContent,
                attachments: adminAttachments
            });

            if (adminData.error) {
                console.error('Resend Admin Email Error:', adminData.error);
            } else {
                console.log('Resend Admin Email Sent:', adminData.id);
            }

            // Acknowledgment Email (Best Effort)
            // This might fail on free tier if 'to' address is not verified
            if (email) {
                try {
                    await resend.emails.send({
                        from: 'Shyam Vertex <onboarding@resend.dev>',
                        to: email,
                        subject: 'Application Received - Shyam Vertex',
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px;">
                                <h2 style="color: #022c22;">Application Received</h2>
                                <p>Dear ${name},</p>
                                <p>We have received your application for the position of <strong>${role}</strong>.</p>
                                <p>Our team will review your details and get back to you shortly.</p>
                                <br>
                                <p>Best Regards,<br>Shyam Vertex Team</p>
                            </div>
                        `
                    });
                    console.log('Resend Acknowledgment Email Sent');
                } catch (ackError) {
                    // Log but do not fail the request
                    console.warn('Resend Acknowledgment Failed (Likely Free Tier limitation):', ackError.message);
                }
            }

            return res.status(200).json({ message: 'Application submitted successfully' });

        } catch (emailError) {
            console.error('Critical Email Logic Error:', emailError);
            // Return success to frontend so user isn't discouraged, but log error
            return res.status(200).json({
                message: 'Application submitted successfully',
                warning: 'Email notification system encountered an issue.'
            });
        }
    } catch (err) {
        console.error("Unexpected error in /api/apply:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Example API route for services
app.get('/api/services', (req, res) => {
    // Placeholder data until DB is populated
    const services = [
        { id: 1, title: 'UI/UX Design', description: 'Crafting intuitive and engaging user experiences.' },
        { id: 2, title: 'Website Development', description: 'Building responsive and high-performance websites.' },
        { id: 3, title: 'App Development', description: 'Developing mobile applications for iOS and Android.' },
        { id: 4, title: 'Custom Software', description: 'Tailored software solutions for your business needs.' },
        { id: 5, title: 'Cloud Services', description: 'Scalable cloud infrastructure and management.' },
        { id: 6, title: 'IT Consultancy', description: 'Expert advice to optimize your IT strategy.' }
    ];

    // If DB is connected, query it here
    // db.query('SELECT * FROM services', (err, results) => { ... });

    res.json(services);
});

// Debug Route to check server configuration (remove in production if sensitive)
app.get('/api/debug/status', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        dbConnected: dbConnected,
        emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        emailUserPrefix: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '***' : null
    });
});

// Debug Route to test email sending specifically
// Debug Route to test email sending specifically (Resend)
app.get('/api/debug/send-test-email', async (req, res) => {
    try {
        const data = await resend.emails.send({
            from: 'Shyam Vertex <onboarding@resend.dev>',
            to: 'pushpa30102040@gmail.com', // Restricted to this address in Resend Testing Mode // Verified address
            subject: 'Debug Test Email from Resend',
            html: '<strong>It works!</strong> The server can now send emails bypasssing the firewall.'
        });

        if (data.error) {
            return res.status(500).json({ error: data.error });
        }

        res.json({
            message: 'Test email sent successfully!',
            data: data
        });
    } catch (error) {
        console.error('Debug email failed:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
