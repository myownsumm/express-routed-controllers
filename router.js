const express = require('express');

const router = express.Router({
    mergeParams: true
});

class DynamicRouter {
    constructor() {
        this._router = router;

        this._action_prefix = '';

        this._middlewares = [];
    }

    setPrefix(prefix = '') {
        this._action_prefix = prefix;
    }

    getPrefix() {
        return this._action_prefix;
    }

    setMiddlewares(list = []) {
        this._middlewares = list;
    }

    getMiddlewares() {
        return this._middlewares;
    }

    applyMiddlewares(action) {
        this._middlewares.forEach(middleware => {
            this._router.use(action, middleware);
        });
    }

    get router() {
        return this._router;
    }

    /**
     * @example dRouter.get('/auth/me', AuthController, 'getMe');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    get(actionStr, controllerClass, methodToCall) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router.get(this.getPrefix() + actionStr, async (req, res, next) => {
            const controller = new controllerClass(req, res);

            try {
                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }

    /**
     * @example dRouter.post('/auth/register', AuthController, 'register');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    post(actionStr, controllerClass, methodToCall) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router.post(this.getPrefix() + actionStr, async (req, res, next) => {
            const controller = new controllerClass(req, res);

            try {
                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }

    /**
     * @example dRouter.put('/user', UserController, 'update');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    put(actionStr, controllerClass, methodToCall) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router.put(this.getPrefix() + actionStr, async (req, res, next) => {
            const controller = new controllerClass(req, res);

            try {
                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }

    /**
     * @example dRouter.delete('/user', UserController, 'remove');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    delete(actionStr, controllerClass, methodToCall) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router.delete(this.getPrefix() + actionStr, async (req, res, next) => {
            const controller = new controllerClass(req, res);

            try {
                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }

    /**
     * @example dRouter.controller('/users', UsersController);
     *
     * @param actionStr
     * @param controllerClass
     */
    controller(actionStr, controllerClass) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router.use(action, async (req, res, next) => {
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

            if (controller[methodToCall] === undefined) {
                throw new Error(`No ${methodToCall}() function inside ${controller.constructor.name} defined.`);
            }

            try {
                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }

    /**
     *
     * @param {{prefix: string, middlewares: array}} paramsObj
     * @param callback
     * @returns {*}
     */
    group(paramsObj, callback) {
        const dRouter = new this.constructor();

        const prefix = this.getPrefix() + (paramsObj.prefix || '');
        const middlewares = this.getMiddlewares().concat(paramsObj.middlewares || []);

        dRouter.setPrefix(prefix);
        dRouter.setMiddlewares(middlewares);

        return callback(dRouter);
    }
}

module.exports = DynamicRouter;