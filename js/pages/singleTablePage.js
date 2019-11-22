// The "single table page" is very similar to the table map page. 
// Once the table map page is more developed, we should consider merging the two, in order to facilitate a smooth transition between them

const MAX_GUESTS = 5;

class SingleTablePage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="single-table-page">
                <div class="content-pane">
                    <div class="cool-content-pane">
                        <div class="table-display"></div>
                        
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        // Add the navbar with all the options/account info
        this.navbar = new NavBar(this.ref, [{
            'text' : 'Make these options the tables',
            'selected' : true,
        }, {
            'text' : 'and maybe these the people',
            'selected' : true,
            'suboption' : true,
        }, {
            'text' : '😂',
            'suboption' : true,
            'onClick' : function () {
                alert('clicked suboption 2');
            },
        }, {
            'text' : 'once we have a table database',
            'onClick' : function() {
                alert('clicked 2');
            },
        }, {
            'text' : '😎',
            'onClick' : function() {
                alert('clicked 3');
            },
        }]);

        // Add the sample text
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Sample Text');

        // Add the table (you get one)
        //this.table = new // Imma let Josh do his thing with the table overview first

        // Add the guests
        this.guests = [];

        // Add the table order card
        this.tableOrder = new TableOrder(this.ref.find('.cool-content-pane'), this.guests);

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.singleTablePage = undefined;
        window.onResize = undefined;
    }

    // Adds a guest to the table 
    addGuest() {

    }

    // Removes a guest from the table 
    removeGuest() {
        // If the guest has an (non-empty) order, ask for confirmation before removing them
    }

    // Dynamic sizes yeah
    onResize() {
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
}