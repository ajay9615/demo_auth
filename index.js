const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.port || 3000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const secret_key = "raman";

// email with register
app.post('/register-email', (request, response) => {
    const { name, email, phone, password } = request.body;
    const sql = 'SELECT * FROM students WHERE email=?';

    if (!name || !email || !phone || !password) {
        return response.status(404).json({ message: "All Fields are required" });
    }
    db.query(sql, [name, email, phone, password], (err, result) => {
        if (err) {
            return response.status(500).json({ message: "Database Internal Error" + err });
        }
        if (result.length > 0) {
            return response.json({ message: "Student is already registered" });
        }
        db.query('INSERT INTO students (name,email, phone, password) VALUES (?,?,?,?)', [name, email, phone, password], (err, result) => {

            if (err) return console.log("errors:" + err);
            response.json({ message: "data inserted successfully" });

        })
    });
});

app.post('/login-email', (request, response) => {

    const sql = "SELECT * FROM students WHERE email=? AND password=?";
    const { email, password } = request.body;
    console.log("s" + email + "pass" + password);
    db.query(sql, [email, password], (error, result) => {
        const student = result[0];

        const token = jwt.sign(
            { id: student.id, email: student.email, password: student.password },
            secret_key,
            { expiresIn: "1h" }
        );

        if (error) throw error;
        response.json({
            message: "login successfully",
            token: token,
            student: {
                name: student.name, email: student.email, phone: student.phone

            }

        });
    })
})
app.listen(port, () => {
    console.log("Server is Running.");
});
