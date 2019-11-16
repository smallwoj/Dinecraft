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
        console.log(opts.length);
        for (var i = 0; i < opts.length; i++) {
            var opt = $(`<div class="option"><h4>${opts[i].text}</h4></div>`);
            if (opts[i].selected) {
                opt.addClass('selected');
            }
           
            if (opts[i].onClick) {
                opt.click(opts[i].onClick);
            }

            this.opts.push(opt.appendTo(this.ref));
        }
    }
}

