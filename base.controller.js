
class BaseController {
    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    response(data) {
        return this._req.json(data);
    }
}

module.exports = BaseController;