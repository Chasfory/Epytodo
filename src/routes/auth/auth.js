const express = require('express');
const auth = require("../../middleware/auth");
const routes = [
    {
        type: 'post',
        milddlewares: [check_arg(['email', 'name', 'firstname', 'password'])],
        route: "/register",
        callback: auth.register,
    },
    {
        type: 'post',
        milddlewares: [check_arg(['email', 'password'])],
        route: '/login',
        callback: auth.login,
    }
];

function create_router_from_routes(routes) {
    const router = express.Router();
    for (const route of routes) {
        router[route.type](route.route, ...route.milddlewares, route.callback);
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