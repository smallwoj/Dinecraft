class AccountsListPage {
    constructor() {
        var el = $(`
            <div class="accounts-list-page">
                <div class="content-pane">
                    <div class="accounts-list-wrap">
                        <div class="accounts-list">
                            <div class="create-acc-btn ui-style-1"><h4>Create Account</h4></div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        this.navbar = new NavBar(this.ref, [{
            'text' : 'Table Map',
            'onClick' : this.goToTableMap.bind(this),
        },  {
            'text' : 'Accounts List',
            'selected' : true,
        }]);

        for (var i = window.DB.accounts.length - 1; i>= 0; i--) {
            var acc = window.DB.accounts[i];
            var elem = $(`
                    <div class="account-details">
                        <div class="account-icon">
                            <img src="${acc.icon.getSource()}">
                        </div>
                        <div class="account-name">
                            <h4>${acc.name}</h4>
                        </div>
                        <div class="account-role">
                            <h4>${acc.role}</h4>
                        </div>
                    </div>
                `); 
            this.ref.find('.accounts-list').prepend(elem);
        }

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Accounts List');

        this.ref.find('.create-acc-btn').click(this.onCreate.bind(this));

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
        this.onResize();
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.appPage = undefined;
        window.onResize = undefined;
    }

    onResize() {
        if (window.isLandscape()) {
            this.navbar.ref.show();
            this.ref.find('.content-pane').css('width', '80%');
            this.titleBar.hideHamburger();
        } else {
            if (!this.titleBar.showSidebar)
                this.titleBar.hideSidebar();
            this.ref.find('.content-pane').css('width', '100%');
            this.titleBar.showHamburger();
        }
    }

    goToTableMap() {
        this.destroy();
        window.createTableMapPage();
    }

    onCreate() {
        this.destroy();
        window.createNewAccountPage();
    }

}
