require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const authrouter = require("./routes/auth/auth");
const todorouter = require("./routes/todos/todos");
const userrouter = require("./routes/user/user")

app.use(express.json());

app.use('', authrouter);
app.use('', todorouter);
app.use('', userrouter);

app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
});