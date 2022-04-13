const connection = require("../../config/db");
const jwt = require('jsonwebtoken');

function user(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`SELECT * FROM user`, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(result));
            });
        }
    });
}

function user_todos_tasks(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`SELECT * FROM todo`, (err, result) => {
            if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
}

function user_params(req, res) {
    if (!isNaN(req.params.params)) {
        return (user_id(req, res));
    } else {
        return (user_email(req, res));
    }
}

function user_id(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`SELECT * FROM user WHERE id = '${req.params.params}'`, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
}

function user_email(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`SELECT * FROM user WHERE email = '${req.params.params}'`, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
}

function user_update(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`UPDATE user SET email='${req.body.email}', name='${req.body.due_name}', firstname='${req.body.firstname}', password='${req.body.password}' WHERE id = '${req.params.id}'`, (err, result) => {
            if(err) throw err;
                connection.query(`SELECT * FROM user WHERE id='${req.params.id}'`, (err, result) => {
                if (err) throw err;
                    res.send(JSON.stringify(result));
                });
            });
        }
    });
}

function user_delete(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`DELETE FROM user WHERE id = '${req.params.id}'`, (err, result) => {
            if(err) throw err;
                res.send({msg: "succesfull deleted record number:" + `${req.params.id}`});
            });
        }
    });
}

module.exports = {
    user: user,
    tasks: user_todos_tasks,
    params: user_params,
    update: user_update,
    delete: user_delete,
}