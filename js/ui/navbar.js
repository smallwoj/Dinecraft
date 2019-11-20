class NavBar {
    constructor(insideElem, opts) {
        var el = $(`
            <div class="nav-bar">
                <div class="account-card">
                    <div class="account-details">
                        <div class="account-icon">
                            <img src="${window.auth.icon.getSource()}">
                        </div>
                        <div class="account-name">
                            <h4>${window.auth.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        `);

/*
    For now don't care about the settings icon
                    <div class="settings-icon">
                        <img src="${window.DB.getIconByName('settings-n').getSource()}">
                    </div>

 * */

        this.ref = el.prependTo($(insideElem));
        this.opts = [];

        // Insert all the menu options provided in the constructor
        for (var i = 0; i < opts.length; i++) {
            var opt = $(`<div><h4>${opts[i].text}</h4></div>`);
            if (opts[i].selected) {
                opt.addClass('selected');
            }

            // Do other styling for options and suboptions
            if (opts[i].suboption) {
                opt.addClass('suboption');
            } else {
                opt.addClass('option');
            }

            // If we want to do something on click of the menu option, then bind it here
            if (opts[i].onClick) {
                opt.click(opts[i].onClick);
            }

            // Also store a reference to the option DOM element
            this.opts.push(opt.appendTo(this.ref));
        }
    }

    selectOption(i) {
        if (!this.opts[i].hasClass('selected')) {
            this.opts[i].addClass('selected');
        }
    }

    unselectOption(i) {
        if (this.opts[i].hasClass('selected')) {
            this.opts[i].removeClass('selected');
        }
    }

    unselectAll() {
        for (var  i = 0; i < this.opts.length; i++) {
            if (this.opts[i].hasClass('selected')) {
                this.opts[i].removeClass('selected');
            }
        }
    }
}

