require('dotenv').config();
// Server restarted to apply updates (Error Handling)
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

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

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shyamvertex_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        console.log('---------------------------------------------------');
        console.log('ACTION REQUIRED: Please ensure your MySQL server is RUNNING.');
        console.log('If using XAMPP, open Control Panel and start "MySQL".');
        console.log('---------------------------------------------------');
        console.log('Running without database connection for now.');
        return;
    }
    console.log('Connected to MySQL database.');
});

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

    // 2. Send Acknowledgment to Sender (Verifies existence)
    const ackMailOptions = {
        from: process.env.EMAIL_USER,
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
    };

    transporter.sendMail(ackMailOptions, (ackError, ackInfo) => {
        if (ackError) {
            console.error('Error sending acknowledgement email:', ackError);
            return res.status(400).json({
                message: 'Could not send email to this address. Please check if the email exists.',
                error: ackError.message
            });
        }

        // 3. If valid, send Notification to Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'shyamvertexpvt@gmail.com',
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
                    <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Sent from Shyam Vertex Website</p>
                </div>
            `
        };

        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
                console.error('Error sending admin email:', error);
            }
            console.log('Contact emails sent successfully.');
            res.status(200).json({ message: 'Message sent successfully' });
        });
    });
});

// Application Submission Route
app.post('/api/apply', upload.single('resume'), (req, res) => {
    const { name, mobile, email, experience, projects, role, skills, portfolio } = req.body;
    const resumePath = req.file ? req.file.path : null;

    // Database Insertion
    const query = 'INSERT INTO applications (name, mobile, email, experience, projects, role, skills, portfolio, resume_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, mobile, email, experience, projects, role, skills, portfolio, resumePath], (err, result) => {
        if (err) {
            console.error('Error saving application to database:', err);
            // If DB fails, we should probably stop here too, but for now we continue to email
        } else {
            console.log('Application saved to database with ID:', result.insertId);
        }
    });

    // 1. Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // 2. Send Acknowledgment to Applicant (Verifies existence)
    const ackMailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send to the applicant
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
    };

    transporter.sendMail(ackMailOptions, (ackError, ackInfo) => {
        if (ackError) {
            console.error('Error sending acknowledgement email:', ackError);
            return res.status(400).json({
                message: 'Could not send email to this address. Please check if the email exists.',
                error: ackError.message
            });
        }

        // 3. If valid, send Notification to Admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: 'shyamvertexpvt@gmail.com',
            subject: `New Job Application: ${role} - ${name}`,
            html: `
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
                        <p>${projects.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">Sent from Shyam Vertex Website</p>
                </div>
            `,
            attachments: resumePath ? [
                {
                    filename: path.basename(resumePath),
                    path: resumePath
                }
            ] : []
        };

        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
                console.error('Error sending admin email:', error);
                // We don't fail the request here because we successfully verified the user
                // But we should log it clearly. 
            }
            console.log('Application emails sent successfully.');
            res.status(200).json({ message: 'Application submitted successfully' });
        });
    });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
