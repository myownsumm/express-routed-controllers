// Type definitions for express-routed-controllers
// Project: https://github.com/myownsumm/express-routed-controllers
// Definitions by: Alexander Poltoratskiy <https://github.com/myownsumm>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


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




