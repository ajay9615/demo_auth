const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
// JWT Secret key (server ke liye private, production me strong string rakho)
const JWT_SECRET = "raman25";


// email with register
app.post('/register-email', (request, response) => {
    const { name, email, phone, password } = request.body;
    if (!name || !email || !phone || !password) {
        return response.status(400).json({ message: "All Fields are required" });
    }

    // Check if email already exists
    db.query('SELECT * FROM students WHERE email=?', [email], (err, result) => {
        if (err) return response.status(500).json({ message: "Database Internal Error: " + err });
        if (result.length > 0) return response.json({ message: "Student is already registered" });

        // Insert new student
        db.query('INSERT INTO students (name,email, phone, password) VALUES (?,?,?,?)', [name, email, phone, password], (err, result) => {
            if (err) return console.log("DB Error: " + err);
            response.json({ message: "Data inserted successfully" });
        });
    });
});

app.post('/login-email', (request, response) => {
    const sql = "SELECT * FROM students WHERE email=? AND password=?";
    const { email, password } = request.body;
    console.log("s" + email + "pass" + password);
    db.query(sql, [email, password], (error, result) => {
        if (error) throw error;
        if (result.length === 0) return response.status(400).json({ message: "Invalid phone or password" });
        const student = result[0];

        const token = jwt.sign({ id: student.id, email: student.email, phone: student.phone },
            JWT_SECRET, { expiresIn: "1h" }
        )

        response.json({
            message: "login successfully",
            token: token,
            student: {
                name: student.name, email: student.email, phone: student.phone

            }

        });
    })
});

app.get('/profile', (req, res) => {
    const authHeather = req.authHeather['authrization'];
    const token = authHeather && authHeather.split(' ')[1];
    if (!token) return res.json({ message: "Token is missing" });
    jwt.verify(token, JWT_SECRET, (error, result) => {
        if (error) throw error;

        res.json({ message: "This is your profile", result });
    })



});
app.listen(port, () => {
    console.log("Server is Running.");
});
