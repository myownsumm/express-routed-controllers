declare module "express-routed-controllers" {
    import * as express from 'express';

    export class RoutedController {
        makeResponse(data: any, format?: string);

        request: express.Request;
        response: express.Response;
    }

    export class DynamicRouter {
        // todo find way to specify controller type of RoutedController
        controller(action: string, controller: any);
        get(action: string, controller: any, method: string);
        put(action: string, controller: any, method: string);
        post(action: string, controller: any, method: string);
        delete(action: string, controller: any, method: string);

        use(func: any);

        public group(params: { prefix?: string, middlewares?: ((req: Express.Request, res: Express.Response, next) => any)[] }, callback);

        public router: any;
    }
}




