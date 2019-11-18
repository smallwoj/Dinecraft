// Controls the behaviour of the ordering page
class OrderingPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="ordering-page">
                <div class="main-container">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="content-pane"></div> //navbar, titlebar
                        <div class="foodcard-wrap"></div>
                        <div class="detailedfoodcard-wrap"></div>
                        <div class="quantity-wrap"></div>
                    </div>
                </div>
            </div>
        `);
        
        //define other elements (titleBar, navBar, icons)
        
        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');
        
        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);

        // Add the navbar with all the options/account info
        this.navbar = new NavBar(this.ref, [{
            'text' : 'Drinks',
            'selected' : true,
            'onClick' : onMenuSelectOption1();
        }, 
        {
            'text' : 'Appetizers',
            'onClick' : onMenuSelectOption2();
            },
        {
            'text' : 'Specials',
            'onClick' : onMenuSelectOption3();
            },
        {
            'text' : 'Entrées',
            'onClick' : onMenuSelectOption4();
            },
        {
            'text' : 'Desserts',
            'onClick' : onMenuSelectOption5();
            }]);


        //implement display search icon/button that actually searches 
            //(brings up keypad, finds certain items)
        //TITILEBAR
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Drinks', this.onBackSelect.bind(this), this.onSearchSelect.bind(this));
        
        
        var options = [];
        for (var i = 0; i < window.DB.menuItems.length; i++) {
            options.push({
                'name' : window.DB.menuItems[i].name,
                'category' : window.DB.menuItems[i].category,
                'icon' : window.DB.menuItems[i].icon,
                'tags' : window.DB.menuItems[i].tags,
            });
        }
        
        //Foodcards
        //defining the foodcards
        this.foodcards = new Foodcards(this.ref.find('.foodcards-wrap'), this.onFoodCardSelect.bind(this), {
            'options': options,
        });
        
        var options = [];
        for (var i = 0; i < window.DB.foodCards.length; i++) {
            options.push({
                'icon' : window.DB.foodcards[i].icon,
                'text' : window.DB.foodcards[i].name,
                //plus, minus, bar in middle that displays 1 on default then reacts to onPlusSelect etc. 
            });
        }
        
        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //destructor
    // Removes the contents on the page and resets variables in the window
    destroy() {
        this.ref.remove();
        window.orderingPage = undefined;
        window.onResize = undefined;
    }
    //other methods to update the state 
    onBackSelect()
    {
        this.destroy();
        window.createSingleTablePage();
    }
    
    onSearchSelect()
    {
        
    }
    onKeyPadSelect()
    {
    }
    
    onFoodCardSelect()
    {
    }
    onPlusSelect()
    {
    }
    onMinusSelect()
    {
    }
    onDetailedFoodCardDeselect()
    {
    }
    
    onMenuSelectOption1()
    {
        this.titlebar.setText('Drinks'); 
    }
    onMenuSelectOption2()
    {
        this.titlebar.setText('Appetizers');
    }
    onMenuSelectOption3()
    {
        this.titlebar.setText('Specials');
    }
    onMenuSelectOption4()
    {
        this.titlebar.setText('Entrées');
    }
    onMenuSelectOption5()
    {
        this.titlebar.setText('Desserts');
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