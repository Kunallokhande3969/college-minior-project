const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // For sending emails
const app = express();
const port = 3000;
 const db = require("./config/db");
 const usermodel = require("./models/usermodel");


  


app.set("view engine", "ejs");
app.use(express.static('public')); 

 app.use(express.json());
 app.use(express.urlencoded({ extended : true }));

app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

// Mock database for bookings
let bookings = [];

     app.get("/",function(req,res){
        res.render("index");
    })
     app.post("/subscribe",function(req,res){
     console.log(res.body);
   })

// Route for booking packages
app.post('/book', (req, res) => {
    const { packageId, name, email } = req.body;
    if (!packageId || !name || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const booking = { packageId, name, email };
    bookings.push(booking);
    return res.status(200).json({ message: 'Booking successful!', booking });
});

// Route for contact form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    // Send email using Nodemailer (for demo purposes, it's set to log the message)
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail or other email service
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password', // Use app-specific password if 2FA is enabled
        }
    });
    let mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending message.' });
        }
        return res.status(200).json({ message: 'Message sent successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
