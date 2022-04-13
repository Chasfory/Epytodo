const bcrypt = require ('bcryptjs');
const connection = require("../config/db");
const jwt = require('jsonwebtoken');

function register(req, res) {
    connection.query(`SELECT email FROM user WHERE email = '${req.body.email}'`, (err, result) => {
        if(err) throw err;
        if(result == 0) {
            create_new_user(req, res);
        } else {
            res.send({msg: "account already exists"});
        }
    });
}

function create_new_user(req, res) {
    const new_password = bcrypt.hashSync(req.body.password, 10);
    connection.query(`INSERT INTO user(email,password,name,firstname) values('${req.body.email}', '${new_password}', '${req.body.name}', '${req.body.firstname}')`, (err, result) => {
        if(err) throw err;
        const token = jwt.sign({email: req.body.email}, process.env.SECRET, {expiresIn: '1800s'});
        res.send({token: token});
    });
}

function login(req, res) {
    connection.query(`SELECT email, password FROM user WHERE email = '${req.body.email}'`, (err, result) => {
        if(err) throw err;
        if(result == 0) {
            res.status(500).send({msg: `internal server error`});
        } else {
            login_user(req, res, result);
        }
    });
}

function login_user(req, res, result) {
    const get_password = bcrypt.compareSync(req.body.password, result[0].password);
    if(get_password == true) {
        const token = jwt.sign({email: req.body.email}, process.env.SECRET, {expiresIn: '1800s'});
        res.send({token: token});
    } else {
        res.send({msg: `Invalid Credentials`});
    }
}

module.exports = {
    register: register,
    login: login,
}