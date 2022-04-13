const express = require('express');
const jwt = require('jsonwebtoken');
const queries = require("./todos.query");
const routes = [
    {
        type: 'get',
        middlewares: [checkToken()],
        route: "/todo",
        callback: queries.todos,
    },
    {
        type: 'get',
        middlewares: [checkToken()],
        route: "/todo/:id",
        callback: queries.id,
    },
    {
        type: 'post',
        middlewares: [checkToken(), check_arg(['title', 'description', 'due_time', 'user_id', 'status'])],
        route: "/todo",
        callback: queries.create,
    },
    {
        type: 'put',
        middlewares: [checkToken(), check_arg(['title', 'description', 'due_time', 'status', 'user_id'])],
        route: "/todo/:id",
        callback: queries.update,
    },
    {
        type: 'delete',
        middlewares: [checkToken()],
        route: "/todo/:id",
        callback: queries.delete,
    }
]

function checkToken() {
    return (req, res, next) => {
        const header = req.headers['authorization'];
        if (typeof header != 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1]
            req.token = token;
            next();
        } else {
            res.status(403).send({msg: "Token is not valid"});
        }
    }
}

function create_router_from_routes(routes) {
    const router = express.Router();
    for (const route of routes) {
        router[route.type](route.route, ...route.middlewares, route.callback);
    }
    return router;
}

function check_arg(args) {
    return (req, res, next) => {
        for (const arg of args) {
            if(arg in req.body) {
                continue;
            } else {
                res.status(500).send({msg: `internal server error`});
                return;
            }
        }
        next();
    }
}

module.exports = create_router_from_routes(routes);