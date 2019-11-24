class TitleBar {
    constructor(insideElem, text, onBack, onSearch, setText) {
        var el = $(`
            <div class="title-bar">
                <div class="page-name">
                    <h4>${text}</h4>
                </div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));
        this.title=text;
        this.onBack=onBack;
        this.onSearch=onSearch;
        this.setText=setText;
        
        if(onBack!=undefined)
        {
            var titlebar=this.ref.find('title-bar');
            var backArrow=$(`
            <div class="back-arrow">img src="./img/owjdiefei.png"></div>
            `);
            backArrow.click(onBack);
        }
        
        if(onSearch!=undefined)
        {
            var titlebar=this.ref.find('title-bar');
            var searchIcon=$(`
            <div class="search-icon">img src="./img/search-standard.png"></div>
            `);
            searchIcon.click(onSearch);
        }
        // If onSearch is provided, then we insert the search icon and make
        //   it do whatever (on entering a character)
        
        
    }
    setText(newText)
    {
        this.title=newText;
    }
}

