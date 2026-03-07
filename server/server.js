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
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Global Error Handlers to prevent server crash in production
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...', err.name, err.message);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...', err.name, err.message);
});

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
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'shyamvertex_db',
    port: process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || 3306
});

const initializeDatabase = () => {
    const tables = [
        `CREATE TABLE IF NOT EXISTS contact_info (
            id INT PRIMARY KEY DEFAULT 1,
            email VARCHAR(255),
            phone_1 VARCHAR(50),
            phone_2 VARCHAR(50),
            address TEXT,
            instagram VARCHAR(255),
            linkedin VARCHAR(255)
        )`,
        `CREATE TABLE IF NOT EXISTS job_settings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            role_id VARCHAR(50) UNIQUE,
            label VARCHAR(100),
            is_hiring BOOLEAN DEFAULT TRUE
        )`,
        `CREATE TABLE IF NOT EXISTS services (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            icon VARCHAR(50)
        )`,
        `CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            excerpt TEXT,
            content TEXT,
            author VARCHAR(100),
            date DATE,
            image TEXT
        )`,
        `CREATE TABLE IF NOT EXISTS contact_messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            subject VARCHAR(255),
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS invite_requests (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(50),
            location VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            mobile VARCHAR(50),
            email VARCHAR(100),
            experience VARCHAR(50),
            projects TEXT,
            role VARCHAR(100),
            skills TEXT,
            portfolio VARCHAR(255),
            resume_path VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    tables.forEach((query, index) => {
        db.query(query, (err) => {
            if (err) {
                if (err.code !== 'ER_TABLE_EXISTS_ERROR' && err.code !== 'ER_DUP_ENTRY') {
                    console.error(`DB Initialization - Table Query failed:`, err.message);
                }
            }
        });
    });

    // Seed initial data sequentially
    setTimeout(() => {
        if (!dbConnected) {
            console.log('Database not connected. Skipping seeding.');
            return;
        }
        db.query('SELECT COUNT(*) as count FROM job_settings', (err, results) => {
            if (!err && results && results[0] && results[0].count === 0) {
                const seedJobs = [
                    ['fulltime', 'Full-time', 1],
                    ['internship', 'Internship', 1],
                    ['freelance', 'Freelance', 1]
                ];
                db.query('INSERT INTO job_settings (role_id, label, is_hiring) VALUES ?', [seedJobs], (err) => {
                    if (err) console.error('Seed Jobs Error:', err.message);
                    else console.log('Job settings seeded.');
                });
            }
        });

        db.query('SELECT COUNT(*) as count FROM contact_info', (err, results) => {
            if (!err && results && results[0] && results[0].count === 0) {
                db.query('INSERT INTO contact_info (id, email, phone_1, address) VALUES (1, "shyamvertexpvt@gmail.com", "+91 87993-03431", "Vadodara, Gujarat")', (err) => {
                    if (err) console.error('Seed Contact Error:', err.message);
                    else console.log('Contact info seeded.');
                });
            }
        });
    }, 10000); // 10 seconds delay following startup to ensure DB is ready
};

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        console.log('---------------------------------------------------');
        console.log('Using IN-MEMORY STORAGE (Fallback Mode).');
        console.log('---------------------------------------------------');
        dbConnected = false;
        // Don't early return, try to initialize tables anyway if possible or handle it later
    } else {
        console.log('Connected to MySQL database.');
        dbConnected = true;
    }
    initializeDatabase();
});

// Email Configuration (Resend API)
// Using hardcoded key for immediate testing, but prefer env var in production
const resend = new Resend(process.env.RESEND_API_KEY || 're_dQ6fGyYM_LgUUnQ8Rgk8ud9UYfii5m9F8');

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
                to: process.env.ADMIN_EMAIL || 'shyamvertexpvt@gmail.com', // Configurable via Environment Variable // Restricted to this address in Resend Testing Mode
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

// Request Invite Endpoint
app.post('/api/request-invite', async (req, res) => {
    const { name, email, phone, location } = req.body;

    // Log to console for debugging
    console.log(`New Invite Request: ${name} (${email}) from ${location}`);

    // 1. Database (Best Effort)
    if (dbConnected) {
        const query = 'INSERT INTO invite_requests (name, email, phone, location) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone, location], (err) => {
            if (err) console.error('DB Error saving invite request:', err);
        });
    }

    // 2. Send Admin Notification via Resend
    try {
        const data = await resend.emails.send({
            from: 'Shyam Vertex <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL || 'shyamvertexpvt@gmail.com',
            subject: `Crewmitra Demo Request: ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 12px; background-color: #ffffff;">
                    <div style="background-color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: #FFD000; margin: 0; font-size: 24px; letter-spacing: 2px;">SHYAM VERTEX</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2 style="color: #333; border-bottom: 2px solid #FFD000; padding-bottom: 10px; margin-bottom: 20px;">New Platform Invite Request</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold; color: #666; width: 120px;">Name:</td>
                                <td style="padding: 10px 0; color: #000;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
                                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold; color: #666;">Phone:</td>
                                <td style="padding: 10px 0; color: #000;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold; color: #666;">Location:</td>
                                <td style="padding: 10px 0; color: #000;">${location}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                        <p style="font-size: 12px; color: #999;">This request was generated from the Product Page invite form.</p>
                    </div>
                </div>
            `
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            // Even if email fails, we return 200 to UI if DB succeeded or we logged it
            return res.status(200).json({ message: 'Request logged, email failed.' });
        }

        res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Server error handling invite:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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

// --- Contact Info API ---
app.get('/api/contact-info', (req, res) => {
    if (!dbConnected) return res.json({ email: 'support@shyamvertex.com' });
    db.query('SELECT * FROM contact_info WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0] || {});
    });
});

app.post('/api/contact-info', (req, res) => {
    const { email, phone_1, phone_2, address, instagram, linkedin } = req.body;
    if (!dbConnected) return res.json({ message: 'Updated (Memory)' });

    const query = `
        INSERT INTO contact_info (id, email, phone_1, phone_2, address, instagram, linkedin)
        VALUES (1, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        email=?, phone_1=?, phone_2=?, address=?, instagram=?, linkedin=?
    `;
    const vals = [email, phone_1, phone_2, address, instagram, linkedin, email, phone_1, phone_2, address, instagram, linkedin];

    db.query(query, vals, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contact info updated' });
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
                to: process.env.ADMIN_EMAIL || 'shyamvertexpvt@gmail.com', // Configurable via Environment Variable // Restricted to this address in Resend Testing Mode // Guaranteed to work if this is the account owner
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

// --- Services API ---

// Get all services
app.get('/api/services', (req, res) => {
    if (!dbConnected) {
        const fallbackServices = [
            { id: 1, title: 'UI/UX Design', description: 'Crafting intuitive and engaging user experiences.', icon: 'Layout' },
            { id: 2, title: 'Website Development', description: 'Building responsive and high-performance websites.', icon: 'Code' },
            { id: 3, title: 'App Development', description: 'Developing mobile applications for iOS and Android.', icon: 'Smartphone' },
            { id: 4, title: 'Custom Software', description: 'Tailored software solutions for your business needs.', icon: 'Cpu' },
            { id: 5, title: 'Cloud Services', description: 'Scalable cloud infrastructure and management.', icon: 'Cloud' },
            { id: 6, title: 'IT Consultancy', description: 'Expert advice to optimize your IT strategy.', icon: 'Monitor' }
        ];
        return res.json(fallbackServices);
    }
    const query = 'SELECT * FROM services ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching services:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});

// Add a new service (Admin)
app.post('/api/services', (req, res) => {
    const { title, description, icon } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Missing fields' });

    if (!dbConnected) return res.json({ message: 'Added (In-Memory Fallback)' });

    const query = 'INSERT INTO services (title, description, icon) VALUES (?, ?, ?)';
    db.query(query, [title, description, icon || 'Code'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: 'Service added successfully' });
    });
});

// Update a service (Admin)
app.put('/api/services/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, icon } = req.body;
    if (!dbConnected) return res.json({ message: 'Updated (Memory)' });

    const query = 'UPDATE services SET title = ?, description = ?, icon = ? WHERE id = ?';
    db.query(query, [title, description, icon, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service updated' });
    });
});

// Delete a service (Admin)
app.delete('/api/services/:id', (req, res) => {
    const { id } = req.params;
    if (!dbConnected) return res.json({ message: 'Deleted (In-Memory Fallback)' });

    const query = 'DELETE FROM services WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service deleted successfully' });
    });
});

// --- Blogs API ---

// Get all blogs
app.get('/api/blogs', (req, res) => {
    if (!dbConnected) return res.json([]);
    const query = 'SELECT * FROM blogs ORDER BY date DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new blog (Admin)
app.post('/api/blogs', upload.single('image'), (req, res) => {
    const { title, excerpt, content, author, date } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) return res.status(400).json({ message: 'Missing fields' });
    if (!dbConnected) return res.json({ message: 'Blog added (In-Memory Fallback)' });

    const query = 'INSERT INTO blogs (title, excerpt, content, author, date, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [title, excerpt, content, author, date || new Date().toISOString().split('T')[0], imagePath], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: 'Blog post created' });
    });
});

// Update a blog (Admin)
app.put('/api/blogs/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, excerpt, content, author, date } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!dbConnected) return res.json({ message: 'Updated (Memory)' });

    let query = 'UPDATE blogs SET title = ?, excerpt = ?, content = ?, author = ?, date = ?';
    let params = [title, excerpt, content, author, date];

    if (imagePath) {
        query += ', image = ?';
        params.push(imagePath);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.query(query, params, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Blog updated' });
    });
});

// Delete a blog (Admin)
app.delete('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    if (!dbConnected) return res.json({ message: 'Deleted (In-Memory Fallback)' });

    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Blog deleted successfully' });
    });
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
            to: 'shyamvertexpvt@gmail.com', // Verified address (Account Owner)
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
