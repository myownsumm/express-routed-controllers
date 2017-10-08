
class BaseController {
    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    response(data, format = 'json') {
        return this._res[format](data);
    }

    get headers() {
        return this._req.headers;
    }

    get body() {
        return this._req.body;
    }

    get query() {
        return this._req.query;
    }
}

module.exports = BaseController;