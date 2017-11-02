const express = require('express');
const merge = require('merge');

const router = express.Router({
    mergeParams: true
});

class DynamicRouter {
    constructor() {
        this._router = router;

        this._action_prefix = '';
    }

    set prefix(prefix) {
        this._action_prefix = prefix;
    }

    get prefix() {
        return this._action_prefix;
    }

    /**
     * @example dRouter.get('/auth/me', AuthController, 'getMe');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodName
     */
    get(actionStr, controllerClass, methodName) {
        this._router.get(this.prefix + actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.query);
        });
    }

    /**
     * @example dRouter.post('/auth/register', AuthController, 'register');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodName
     */
    post(actionStr, controllerClass, methodName) {
        this._router.post(this.prefix + actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.body);
        });
    }

    /**
     * @example dRouter.put('/user', UserController, 'update');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodName
     */
    put(actionStr, controllerClass, methodName) {
        this._router.put(this.prefix + actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.body);
        });
    }

    /**
     * @example dRouter.delete('/user', UserController, 'remove');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodName
     */
    delete(actionStr, controllerClass, methodName) {
        this._router.delete(this.prefix + actionStr, (req, res, next) => {
            const controller = new controllerClass(req, res);

            return controller[methodName](req.query);
        });
    }

    /**
     * @example dRouter.controller('/users', UsersController);
     *
     * @param actionStr
     * @param controllerClass
     */
    controller(actionStr, controllerClass) {
        this._router.use(this.prefix + actionStr, (req, res, next) => {
            const httpMethod = req.method;

            // cut uri coded params like "?param=value"
            const startedGetParamsFromIndex = req.url.indexOf('?');
            const action = req.url.slice(1, startedGetParamsFromIndex !== -1 ? startedGetParamsFromIndex : req.url.length);

            // modify "my-super-endpoint" to "mySuperEndpoint"
            const camelCased = action.replace(/-([a-z])/g, g => {
                return g[1].toUpperCase();
            });

            // concat "get" with "mySuperEndpoint" to get "getMySuperEndpoint"
            const methodToCall = httpMethod.toLowerCase() + camelCased.charAt(0).toUpperCase() + camelCased.slice(1);

            const controller = new controllerClass(req, res);

            return controller[methodToCall](
                merge.recursive(true, req.query, req.body)
            );
        });
    }

    /**
     *
     * @param {{prefix: string}} paramsObj
     * @param callback
     * @returns {*}
     */
    group(paramsObj, callback) {
        const dRouter = new this.constructor();
        dRouter.prefix = this.prefix + paramsObj.prefix;

        return callback(dRouter);
    }

    get router() {
        return this._router;
    }
}

module.exports = DynamicRouter;