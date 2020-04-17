class JSend {
    constructor(data, message) {

        if (data) {
            this.data = data;
        }

        if (message) {
            this.message = message;
        }
    }

    send(res, data) {
        this.status = 'success';

        if (data) {
            this.data = data;
        }

        delete this.message;

        res.status(200).json(this)
    }

    error(res, err) {
        this.status = 'error';
        this.message = err.message;

        delete this.data;

        res.status(400).json(this);
    }
}

module.exports = JSend;