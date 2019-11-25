class TitleBar {

    // onSearch needs to be a callback function if you want to have a search bar in the title bar
    // onSearch will be fired once there is any change in the search bar input field
    // onSearch will be passed one argument that contains current value of the input
    constructor(insideElem, text, onSearch, onBack) {
        this.showingHamburger = false;
        this.showSidebar = false;

        var el = $(`
            <div class="title-bar">
                <div class="tb-left">
                    <div class="hamburger-btn">
                        <img src="${window.DB.getIconByName('hamburger-n').getSource()}">
                    </div>
                </div>
                <div class="page-name">
                    <h4>${text}</h4>
                </div>
                <div class="tb-right">
                    <div class="search-wrap">
                             <input class="search-input" type="text" name="username" placeholder="Search..." size=30>
                    </div>
                </div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));
        this.title=text;
        this.onBack=onBack;
        this.onSearch = onSearch; 

        this.ref.find('.hamburger-btn').click(this.toggleNav.bind(this));

        if(onBack!=undefined)
        {
            var titlebar=this.ref.find('title-bar');
            var backArrow=$(`
            <div class="back-arrow">img src="./img/back-standard.png"></div>
            `);
            backArrow.click(onBack);
        }
        
        if(this.onSearch)
        {
            var titlebar=this.ref.find('title-bar');
            var searchIcon=$(`
            <div class="search-icon">img src="./img/search-standard.png"></div>
            `);
            searchIcon.click(onSearch);
        }

        // If onSearch is provided, then make the search inout visible and functional
        if (this.onSearch) {
            this.ref.find('.search-wrap').css('visibility', 'visible');
            this.ref.find('.search-input').on('input', (function(e) {
                this.onSearch($(e.target).val());
            }).bind(this));
        } else {
            this.ref.find('.search-wrap').css('visibility', 'hidden');
        }
    }

    setText(newText)
    {
        this.title=newText;
        $(this.ref.find('.page-name')).html(`<h4>${this.title}</h4>`);
    }
    
    

    hideHamburger() {
        this.showingHamburger = false;
        this.ref.find('.hamburger-btn').css('visibility', 'hidden');
        this.showSidebar = false;
        this.resetSidebar();
    }

    showHamburger() {
        this.showingHamburger = true;
        this.ref.find('.hamburger-btn').css('visibility', 'visible');
    }

    toggleNav() {
        this.showSidebar = !this.showSidebar;

        if (this.showSidebar) {
            this.showSidebareeeeeeeeeee();
        } else {
            this.hideSidebar();
        }
    }

    showSidebareeeeeeeeeee() {
        $('body').append('<div class="dark-overlay"></div>');
        $('.dark-overlay').click(this.hideSidebar.bind(this));
        $('.nav-bar').show();
        $('.nav-bar').css('position', 'absolute');
    }

    resetSidebar() {
        this.showSidebar = false;
        $('.dark-overlay').remove();
        $('.nav-bar').show();
        $('.nav-bar').css('position', '');
    }

    hideSidebar() {
        this.showSidebar = false;
        $('.dark-overlay').remove();       
        $('.nav-bar').hide();
    }
}

