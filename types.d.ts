declare module "express-routed-controllers" {
    import * as express from 'express';

    export class BaseController {
        makeResponse(data: object, format?: string);

        request: express.Request;
        response: express.Response;
    }

    export class DynamicRouter {
        // todo find way to specify controller type of BaseController
        controller(action: string, controller: any);

        public group(params: { prefix?: string, middlewares?: ((req: Express.Request, res: Express.Response, next) => any)[] }, callback);

        public router: any;
    }
}




