const connection = require("../../config/db");
const jwt = require('jsonwebtoken');

function todos(req, res) {
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

function todo_id(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`SELECT * FROM todo WHERE id = '${req.params.id}'`, (err, result) => {
                if (err) throw err;
                res.send(JSON.stringify(result));
            });
        }
    });
}

function todo_create(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`INSERT INTO todo(title, description, due_time, user_id, status) values('${req.body.title}', '${req.body.description}', '${req.body.due_time}', '${req.body.user_id}', '${req.body.status}')`, (err, result) => {
                console.log(req.body.status);
                if(err) throw err;
                connection.query(`SELECT * FROM todo`, (err, result) => {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });
            });
        }
    });
}

function todo_update(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`UPDATE todo SET title='${req.body.title}', description='${req.body.descirption}', due_time='${req.body.due_time}', user_id='${req.body.user_id}', status='${req.body.status}' WHERE id = '${req.params.id}'`, (err, result) => {
                if(err) throw err;
                connection.query(`SELECT * FROM todo WHERE id='${req.params.id}'`, (err, result) => {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });
            });
        }
    });
}

function todo_delete(req, res) {
    jwt.verify(req.token, process.env.SECRET, (err, authorization) => {
        if(err) {
            res.status(403).send({msg: "No token, authorization denied"});
        } else {
            connection.query(`DELETE FROM todo WHERE id = '${req.params.id}'`, (err, result) => {
                if(err) throw err;
                res.send({msg: "succesfull deleted record number:" + c});
            });
        }
    });
}

module.exports = {
    todos: todos,
    id: todo_id,
    create: todo_create,
    update: todo_update,
    delete: todo_delete,
}