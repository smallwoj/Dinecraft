// Controls the behaviour of the login page
class LoginPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="login-page">
                <div class="main-container">
                    <div class="logo-wrap">
                        <img src="./img/dinecraft_logo.png">
                    </div>
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="dropdown-wrap"></div>
                        <div class="pin-wrap"></div>
                        <div class="keypad-wrap"></div>
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', 'url("./img/pano3.png")');


        // Here add all other components of the page
        //--
        // Options for a dropdown menu parsed from accounts 
        //setting up "list"/array for the dropdown
        var options = [];
        for (var i = 0; i < window.DB.accounts.length; i++) {
            options.push({
                'icon' : window.DB.accounts[i].icon,
                'text' : window.DB.accounts[i].name,
            });
        }

        //defining the Dropdown
        this.dropdown = new Dropdown(this.ref.find('.dropdown-wrap'), this.onAccountSelect.bind(this), {
            'defText': 'Select an account',
            'options': options,
        });

        // Pin field indicators
        this.pinField = new PinField(this.ref.find('.pin-wrap'), 6, this.onPinEntered.bind(this));
        this.pinField.enabled = false;

        // Keypad
        this.keypad = new Keypad(
            this.ref.find('.keypad-wrap'), 
            this.onKeypadAdd.bind(this), 
            this.onKeypadRemove.bind(this),
            this.onKeypadClear.bind(this),
        );
        this.keypad.enabled = false;

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }

    // Removes the contents on the page and resets variables in the window

    destroy() {
        this.ref.remove();
        window.loginPage = undefined;
        window.onResize = undefined;
    }

    // Dynamic sizes yeah
    onResize() {
        this.pinField.resize();
        this.keypad.resize();

        var keyUnit = this.keypad.btns[0].css('width');

        if (keyUnit) {
            keyUnit = Number(keyUnit.replace('px', ''));
            var val = 1.1 * keyUnit; 
            this.dropdown.field.css('height', keyUnit);
            this.dropdown.ref.find('.dropdown-item').css('height', keyUnit);
        }
    }

    onAccountSelect() {
        // When something is selected in the dropdown menu, then we enable
        //    keypad and pin. Moreover, we clear the pin if the account
        //    is selected mid-pin entry
        if (this.dropdown.selected != -1) {
            this.keypad.enabled = true;
            this.pinField.enabled = true;
            this.onKeypadClear();
        }
    }

    // Adding a character to the pin
    onKeypadAdd(i) {
        if (this.pinField.pin.length < this.pinField.max) {
            this.pinField.pin += String(i);
            this.pinField.setEntered(this.pinField.pin.length); // Sets how many big pin indicators to display
        }
    }

    // Removes a single char from a pin
    onKeypadRemove() {
        if (this.pinField.pin.length > 0) {
            this.pinField.pin = this.pinField.pin.substring(0, this.pinField.pin.length - 1);
            this.pinField.setEntered(this.pinField.pin.length);
        }
    }

    // Clears the entered pin
    onKeypadClear() {
        this.pinField.pin = '';
        this.pinField.setEntered(0);
    }

    // When all 6 digits of the pin entered
    onPinEntered() {
        var acc = this.doAuthCheck();
        if (!acc) { // pin doesnt match
            this.onKeypadClear();
            this.pinField.ref.effect('shake');
        } else { // pin matches
            this.destroy(); // we are moving from the page
            
            // Store which acc we are logging in as and go to the next page
            window.auth = acc;
            window.createTableMapPage();
        }
    }

    // Validates the pin
    doAuthCheck() {
        // Hacky: get the account from database based on the current selected option in the dropdown menu
        var acc = window.DB.accounts[this.dropdown.selected];
        if (acc.pin === this.pinField.pin) {
            return acc;
        } else {
            return null
        }
    }
}
