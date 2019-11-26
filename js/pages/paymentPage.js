class PaymentPage
{
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="payment-page">
                <div class="content-pane">
                    <div style="width: 100%; height: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="back-btn-shrek"></div>
                        <div class="bills-wrap" style="margin-bottom:2%;height:100%;"></div>
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        this.backBtn = new Fab(this.ref.find('.back-btn-shrek'), (function() {
            this.destroy();
            window.createSingleTablePage();
        }).bind(this));


        var navbarOpts = [{
            'text' : 'Table Map',
            'onClick' : function() {
                alert('clicked 1');
            },
        }
        ];

        if (window.auth.role === 'manager') {
            navbarOpts.push({
                'text' : 'Accounts List',
                'onClick' : this.goToAccList.bind(this),
            });
        }

        // Add the navbar with all the options/account info
        this.navbar = new NavBar(this.ref, navbarOpts);

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Payment for Table '+window.currTable.number);

        this.bills = [];

        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');        

        for(var i = 0; i < window.currTable.guestOrders.length; i++)
        {
            this.bills.push(new Bill(this.ref.find('.bills-wrap'), window.currTable.guestOrders[i]));
        }

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
        this.onResize();
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.loginPage = undefined;
        window.onResize = undefined;
    }

    // Dynamic sizes yeah
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

    goToAccList() {
        this.destroy();
        window.createAccountsListPage();
    }

    goToTableMap()
    {
        this.destroy();
        window.createTableMapPage();
    }

    checkAllPaid()
    {
        for(var i = 0; i < this.bills.length; i++)
        {
            if(this.bills[i].paid == undefined)
                return;
        }
        window.currTable.guestOrders = [];
        window.currTable.state = 'cleaning';

        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
        <div class="popup ui-style-1">
            <div class="popup-top" align="center"><h4>Table ${window.currTable.number} finished paying!</h4>
            </div>
            <div class="popup-bottom">
                <div class="popup-ok ui-style-1"><h4>Ok</h4></div>
            </div>
        </div>
        `);
        $('.popup-ok').css("width", '100%');
        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-ok').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        this.goToTableMap();
    }
}
