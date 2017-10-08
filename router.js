const express = require('express');
const merge = require('merge');

const router = express.Router({
    mergeParams: true
});

class DynamicRouter {
    constructor() {
        this._router = router;
    }

    get(actionStr, controllerClass, methodName) {
        this._router.get(actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.query);
        });
    }

    post(actionStr, controllerClass, methodName) {
        this._router.post(actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.body);
        });
    }

    put(actionStr, controllerClass, methodName) {
        this._router.put(actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.body);
        });
    }

    delete(actionStr, controllerClass, methodName) {
        this._router.delete(actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.query);
        });
    }

    controller(url, controllerClass) {
        this._router.use(url, (req, res, next) => {
            const httpMethod = req.method;

            const startedGetParamsFromIndex = req.url.indexOf('?');
            const action = req.url.slice(1, startedGetParamsFromIndex !== -1? startedGetParamsFromIndex : req.url.length);

            const methodToCall = httpMethod.toLowerCase() + action.charAt(0).toUpperCase() + action.slice(1);

            const controller = new controllerClass(req, res);

            return controller[methodToCall](
                merge.recursive(true, req.query, req.body)
            );
        });
    }

    get router() {
        return this._router;
    }
}

module.exports = DynamicRouter;