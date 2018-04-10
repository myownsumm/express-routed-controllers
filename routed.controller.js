class RoutedController {
    constructor(req, res) {
        this._req = req;
        // this._req = this._convertRequestProps(req);
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

    // _convertRequestProps(request) {
    //     let requestProps = ['body', 'params', 'query'];
    //
    //     requestProps.forEach(requestProperty => {
    //         if (!request[requestProperty]) {
    //             return false;
    //         }
    //
    //         for (let prop in request[requestProperty]) {
    //             if (!request[requestProperty].hasOwnProperty(prop)) {
    //                 continue;
    //             }
    //
    //             this._convertToBooleanPropIfRequired(prop);
    //             this._convertToIntegerPropIfRequired(prop);
    //         }
    //     });
    //
    //     return requestProps;
    // }
    //
    // _convertToBooleanPropIfRequired(propertyValue) {
    //     if (propertyValue === 'true' || propertyValue === 'false') {
    //         propertyValue = propertyValue === 'true';
    //     }
    //
    //     console.log('propertyValue', propertyValue);
    //
    //     return propertyValue;
    // }
    //
    // _convertToIntegerPropIfRequired(propertyValue) {
    //     if (/^-?([0-9]*[.])?[0-9]+$/.test(propertyValue)) {
    //         propertyValue = Number(propertyValue);
    //     }
    //
    //     return propertyValue;
    // }
}

module.exports = RoutedController;