
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
}

module.exports = BaseController;