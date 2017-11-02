# express-routed-controllers

Simple library allowing you to use declarative routing in "laravel way".

It contains two main parts:
* BaseController
* Dynamic router

### BaseController
Extend your controllers from BaseController and you will get such benefits as Request properties injection (not working yet),
configurable response() method. Most features are not developed yet.

### Dynamic Router
Import it and initialize it with your Express router.
Such functionality is available:
```javascript
const dRouter = new DynamicRouter();

dRouter.get('/auth/me', AuthController, 'getMe');
dRouter.post('/auth/register', AuthController, 'register');
dRouter.controller('/users', UsersController);

dRouter.group(
    {
        prefix: '/group1'
    },
    (group) => {
        group.controller('/test', TestsController);
    }
);

this.express.use(dRouter.router);
```