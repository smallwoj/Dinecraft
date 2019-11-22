// Controls the behaviour of the table map page
class TableMapPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="table-map-page">
                <div class="content-pane">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="tables-wrap"></div>
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        // Add the navbar with all the options/account info
        this.navbar = new NavBar(this.ref, [{
            'text' : 'Menu option 1',
            'selected' : true,
        }, {
            'text' : 'Menu subopt 1',
            'selected' : true,
            'suboption' : true,
        }, {
            'text' : 'Menu subopt 2',
            'suboption' : true,
            'onClick' : function () {
                alert('clicked suboption 2');
            },
        }, {
            'text' : 'Menu option 2',
            'onClick' : function() {
                alert('clicked 2');
            },
        }, {
            'text' : 'Menu option 3',
            'onClick' : function() {
                alert('clicked 3');
            },
        }]);

        this.tables = [];

        //for each table in the table database, create em
        for(var i = 0; i < window.DB.tables.length; i++)
        {
            this.tables.push(new TableSelector(this.ref.find(".tables-wrap"), this.onTableSelect.bind(this), window.DB.tables[i]));
        }

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Table Map');

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.loginPage = undefined;
        window.onResize = undefined;
    }

    // Dynamic sizes yeah
    onResize() {
        //navbar stuff
        if (window.isLandscape()) {
            if (this.navbar.ref.is(':hidden')) {
                this.navbar.ref.show();
                this.ref.find('.content-pane').css('width', '80%');
            }
        } else {
            if (this.navbar.ref.is(':visible')) {
                this.navbar.ref.hide();
                this.ref.find('.content-pane').css('width', '100%');
            }
        }
    }

    onTableSelect(table)
    {
        this.destroy();
        //store which table we are at and go to the next page
        window.currTable = table;
        window.createSingleTablePage();
    }
}

