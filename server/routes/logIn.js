const express = require("express");
const db = require('../models/db');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        // Check if the email exists in the students table
        const emailExistsQuery = `SELECT * FROM students WHERE email = $1`;
        const emailExistsValues = [body.email];
        const emailExistsResult = await db.query(emailExistsQuery, emailExistsValues);
        if (emailExistsResult.rowCount === 0) {
            // Email does not exist, return error message
            res.status(400).send({ error: "Email or password is incorrect." });
        } else {
            // Email exists, check if the password is correct
            const student = emailExistsResult.rows[0];
            const plainPassword = body.password;
            const passwordMatch = await bcrypt.compare(plainPassword, student.password);
            if (passwordMatch) {
                // Password is correct, return success message
                const secret = "students";
                const token = jwt.sign({ id: student.id , email:student.email, name:student.name}, secret);
                res.send({ message: "Logged in successfully.", token });
            } else {
                // Password is incorrect, return error message
                res.status(400).send({ error: "Email or password is incorrect." });
            }
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
