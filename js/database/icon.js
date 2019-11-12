class Icon {
    constructor(name, source) {
        this.name = name;     // Short name of the icon
        this.source = source; // URL of the icon, relative to index.html file
    }

    getSource() {
        return this.source;
    }

    getName() {
        return this.name;
    }
}
