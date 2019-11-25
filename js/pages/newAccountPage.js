// TODO: normalize the sidebar across the app (consistent options everywhere, display account creation
//   only for managers, etc)
// TODO: form error checking and outputting in onSubmit()

// Controls the behavious of the new account page
class NewAccountPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="new-account-page">
                <div class="content-pane">
                    <div class="account-creation-wrap">
                        <div class="account-creation">
                            <div class="error-message"></div>
                            <input class="acc-input" type="text" name="username" placeholder="Name" size=30 required>
                            <input class="acc-input" type="password" name="pin" placeholder="PIN" size=30 maxlength=6 required>
                            <div class="icon-select"></div>
                            <div class="role-select"></div>
                            <br><br><br>
                            <br><br><br>
                            <div class="create-btn ui-style-1"><h4>Create</h4></div>
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
        }, {
            'text' : 'Menu option 2',
            'onClick' : function() {
                alert('clicked 2');
            },
        }, {
            'text' : 'Accounts List',
            'onClick' : this.goToAccList.bind(this),
        }]);

        this.roleDropdown = new Dropdown(this.ref.find('.role-select'), function() {}, {
            defText: 'Select Role',
            options: [{
                'text' : 'Server',
            }, {
                'text' : 'Manager',
            }],
        });

        this.iconDropdown = new Dropdown(this.ref.find('.icon-select'), function() {}, {
            defText: 'Select Icon',
            options: [{
                'text' : 'Scary Lady',
                'icon' : window.DB.getIconByName('userAcc1')
            }, {
                'text' : 'mANAGER',
                'icon' : window.DB.getIconByName('userAcc2')
            }, {
                'text' : 'awww man',
                'icon' : window.DB.getIconByName('userAcc3')
            }, {
                'text' : 'Funni squidward',
                'icon' : window.DB.getIconByName('userAcc4')
            }, {
                'text' : 'The mANAGER',
                'icon' : window.DB.getIconByName('userAcc5')
            }],
        });

        this.ref.find('.create-btn').click(this.onSubmit.bind(this));

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Create Account');

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

    goToAccList() {
        this.destroy();
        window.createAccountsListPage();
    }

    onSubmit() {
        // Somebody please did error checking here
        var valid = true;
        
        if(this.iconDropdown.selected === -1) valid = "Please select an icon.";
        
        if(this.roleDropdown.selected === -1) valid = "Please select a role.";

        if(isNaN(this.ref.find('.acc-input[name="pin"]').val())) valid = "PINs consist of numbers.";

        if(this.ref.find('.acc-input[name="pin"]').val().length != 6) valid = "PINs have to have 6 numbers.";
        
        if(this.ref.find('.acc-input[name="username"]').val() === '') valid = "You can't have an empty username!";

        if(valid!=true)
        {
            $('.error-message').html(`${valid}`);
            return;
        }
        this.destroy(); // we are moving from the page

        // Add new account to database and go back to the account list
        window.DB.accounts.push(new Account(
            this.ref.find('.acc-input[name="username"]').val(),
            this.ref.find('.acc-input[name="pin"]').val(),
            this.roleDropdown.selected === 0 ? 'server' : 'manager',
            window.DB.icons[this.iconDropdown.selected],
        ));
        window.createAccountsListPage();
    }

}
