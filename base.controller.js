
class BaseController {
    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    response(data, format = 'json') {
        return this._req[format](data);
    }

    get headers() {
        return this._req.headers;
    }

    get body() {
        return this._req.body;
    }
}

module.exports = BaseController;