# express-routed-controllers

Simple library allowing you to use declarative routing in "laravel way".

It contains two main parts:
* RoutedController
* DynamicRouter

### BaseController
Extend your controllers from BaseController and you'll get such benefits as Request properties injection,
configurable response() method.

### DynamicRouter
Import it and initialize it with your Express router.
Such functionality is available:
```javascript
const dRouter = new DynamicRouter();

dRouter.get('/auth/me', AuthController, 'getMe');
dRouter.post('/auth/register', AuthController, 'register');
dRouter.controller('/users', UsersController);

dRouter.group({
        middlewares: [guestMiddleware]
    },
    guest => {
        guest.post('/auth/register', AuthController, 'register');
        guest.post('/auth/login', AuthController, 'login');
    }
);

dRouter.group(
    {
        prefix: '/group1',
        middlewares: [authMiddleware]
    },
    (group) => {
        group.controller('/test', TestsController);
    }
);

this.express.use(dRouter.router);
```