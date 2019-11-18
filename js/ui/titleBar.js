class TitleBar {
    constructor(insideElem, text, onBack, onSearch) {
        var el = $(`
            <div class="title-bar">
                <div class="page-name">
                    <h4>${text}</h4>
                </div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));

        // If onBack is provided, then we insert back arrow and make
        //   it do whatever (on click)

        // If onSearch is provided, then we insert the search icon and make
        //   it do whatever (on entering a character)
    }
}

