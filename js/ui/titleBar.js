class TitleBar {
    constructor(insideElem, text) {
        var el = $(`
            <div class="title-bar">
                <div class="page-name">
                    <h4>${text}</h4>
                </div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));
    }
}

