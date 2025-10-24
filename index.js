const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const db = require('./db');
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

    const sql = "SELECT * FROM students WHERE phone=? AND password=?";
    const { phone, password } = request.body;
    console.log("s" + phone + "pass" + password);
    db.query(sql, [phone, password], (error, result) => {
        const student = result[0];
        if (error) throw error;
        response.json({
            message: "login successfully", student: {
                name: student.name, email: student.email, phone: student.phone

            }
        });
    })
})
app.listen(port, () => {
    console.log("Server is Running.");
});
