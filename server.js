const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(
    cors({
        origin: [
            "http://127.0.0.1:5501", // Local development
            "https://bhagat-saloni.github.io", // GitHub Pages
        ],
    })
);

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
    const { name, phone, email, message } = req.body;

    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: "Invalid email address." });
    }

    const phonePattern = /^\+?[0-9]{1,3}?[-.\s]?([0-9]{10})$/;
    if (phone && !phonePattern.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number format." });
    }

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your Gmail app password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender's email
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error); // Log the error
        res.status(500).json({ error: "Failed to send the message." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
