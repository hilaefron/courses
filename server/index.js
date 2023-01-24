const express = require("express");
const cors = require("cors");

const subject = require("./routes/subjects");
const students = require("./routes/students");
const login = require("./routes/logIn");
const courseSignUp = require("./routes/registers");

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.use("/api/subject", subject);
app.use("/api/students", students);
app.use("/api/logIn", login);
app.use("/api/registers", courseSignUp);

app.listen(port, () => `active on port: ${port}`);
