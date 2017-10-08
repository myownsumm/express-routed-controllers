const express = require('express');

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

    controller() {
        // todo
    }

    applyTo(expressRouter) {
        expressRouter.use(this._router);
    }

    get router() {
        return this._router;
    }
}

module.exports = DynamicRouter;