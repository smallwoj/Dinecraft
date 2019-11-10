class Icon {
    constructor(name, source) {
        if (!name || !source) {
            console.error('Missing parameters');
            return;
        }

        this._name = name;
        this._source = source;
    }

    getSource() {
        return this._source;
    }

    getName() {
        return this._name;
    }
}
