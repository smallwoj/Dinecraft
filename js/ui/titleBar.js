class TitleBar {
    constructor(insideElem, text, onSearch) {
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
                <div class="tb-right"><h4>Search</h4></div>
            </div>
        `);

        this.ref = el.prependTo($(insideElem));

        this.ref.find('.hamburger-btn').click(this.toggleNav.bind(this));

        // If onSearch is provided, then we insert the search icon and make
        //   it do whatever (on entering a character)
    }

    hideHamburger() {
        this.showingHamburger = false;
        this.ref.find('.hamburger-btn').css('visibility', 'hidden');
        this.showSidebar = false;
        this.resetSidebar();
    }

    showHamburger() {
        this.showingHamburger = true;
        this.showSidebar = false;
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

