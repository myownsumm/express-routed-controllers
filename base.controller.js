
class BaseController {
    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    response(data, format = 'json') {
        return this._res[format](data);
    }

    get request() {
        return this._req;
    }
}

module.exports = BaseController;