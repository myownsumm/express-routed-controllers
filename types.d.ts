declare module "express-routed-controllers" {
    import * as express from 'express';

    export class BaseController {
        response(data: object, format?: string);

        request: express.Request;
    }

    export class DynamicRouter {
        // todo find way to specify controller type of BaseController
        controller(action: string, controller: any);

        public router: any;
    }
}



