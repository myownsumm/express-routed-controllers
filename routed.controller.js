class RoutedController {
    constructor(req, res) {
        this._req = req;
        this._res = res;
    }

    makeResponse(data, format = 'json') {
        return this._res[format](data);
    }

    get request() {
        return this._req;
    }

    get response() {
        return this._res;
    }
}

module.exports = RoutedController;