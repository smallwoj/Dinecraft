class TitleBar {
    constructor(insideElem, text, onBack, onSearch) {
        var el = $(`
            <div class="title-bar">
                <div class="tb-left">
                    <div class="back-btn">
                        <div class="back-btn-icon"><img src="${window.DB.getIconByName('back-n')}"></div>
                        <div class="back-btn-text">                    <h4>Back</h4></div>
                    </div>

                </div>
                <div class="page-name">
                    <h4>${text}</h4>
                </div>
                <div class="tb-right"><h4>Search</h4></div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));

        if (onBack) {
        }

        // If onSearch is provided, then we insert the search icon and make
        //   it do whatever (on entering a character)
    }
}

