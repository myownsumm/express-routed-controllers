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
        return this._handleDefinedRequest(actionStr, controllerClass, methodToCall, 'get');
    }

    /**
     * @example dRouter.post('/auth/register', AuthController, 'register');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    post(actionStr, controllerClass, methodToCall) {
        return this._handleDefinedRequest(actionStr, controllerClass, methodToCall, 'post');
    }

    /**
     * @example dRouter.put('/user', UserController, 'update');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    put(actionStr, controllerClass, methodToCall) {
        return this._handleDefinedRequest(actionStr, controllerClass, methodToCall, 'put');
    }

    /**
     * @example dRouter.delete('/user', UserController, 'remove');
     *
     * @param actionStr
     * @param controllerClass
     * @param methodToCall
     */
    delete(actionStr, controllerClass, methodToCall) {
        return this._handleDefinedRequest(actionStr, controllerClass, methodToCall, 'delete');
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
            try {
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

                this._checkIfActionExists(controller, methodToCall);

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

    /**
     *
     * @param controller
     * @param action
     * @private
     */
    _checkIfActionExists(controller, action) {
        if (controller[action] === undefined) {
            throw new Error(`No ${action}() action inside ${controller.constructor.name} defined.`);
        }
    }

    _handleDefinedRequest(actionStr, controllerClass, methodToCall, method) {
        const action = this.getPrefix() + actionStr;

        this.applyMiddlewares(action);

        this._router[method](this.getPrefix() + actionStr, async (req, res, next) => {
            const controller = new controllerClass(req, res);

            try {
                this._checkIfActionExists(controller, methodToCall);

                return await controller[methodToCall]();
            } catch (err) {
                return next(err);
            }
        });
    }
}

module.exports = DynamicRouter;