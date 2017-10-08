const express = require('express');

const router = express.Router({
    mergeParams: true
});

class DynamicRouter {
    constructor() {
        this._router = router;
    }

    get(actionStr, controllerClass, methodName) {
        console.log(actionStr, controllerClass, methodName);
    }

    applyTo(expressRouter) {
        expressRouter.use(this._router);
    }

    get router() {
        return this._router;
    }
}

module.exports = DynamicRouter;