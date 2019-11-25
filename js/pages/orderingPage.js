// Controls the behaviour of the ordering page
class orderingPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="ordering-page">
                <div class="content-pane">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="foodcard-wrap"></div>
                        <div class="detailedfoodcard-wrap"></div>
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
        var navbarOpts = [{
            'text' : 'Drinks',
            'selected' : true,
            'onClick' : this.onMenuSelectOption1.bind(this)
        }, 
        {
            'text' : 'Appetizers',
            'onClick' : this.onMenuSelectOption2.bind(this)
            },
        {
            'text' : 'Specials',
            'onClick' : this.onMenuSelectOption3.bind(this)
            },
        {
            'text' : 'Entrées',
            'onClick' : this.onMenuSelectOption4.bind(this)
            },
        {
            'text' : 'Desserts',
            'onClick' : this.onMenuSelectOption5.bind(this)
            }];

        this.navbar = new NavBar(this.ref, navbarOpts);
        
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Drinks', this.onSearchSelect.bind(this));
        
        var options = [];
        for (var i = 0; i < window.DB.menuItems.length; i++) {
            options.push({
                'name' : window.DB.menuItems[i].name,
                'category' : window.DB.menuItems[i].category,
                'icon' : window.DB.menuItems[i].icon,
                'tags' : window.DB.menuItems[i].tags,
            });
        }
        /*
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
    */
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
    /////////////////////////////
    onFoodCardSelect()
    {
    }
    onPlusSelect()
    {
        //add text 1
    }
    onMinusSelect()
    {
        //minus text 1 
    }
    onDetailedFoodCardDeselect()
    {
        this.detailedFoodCard=undefined;
    }
    
   
   onMenuSelectOption1()
    {
        this.titleBar.setText('Drinks'); 
        this.navbar.unselectAll();
        this.navbar.selectOption(1); 
    }
    onMenuSelectOption2()
    {
        this.titleBar.setText('Appetizers');
        this.navbar.unselectAll();
        this.navbar.selectOption(2);
    }
    onMenuSelectOption3()
    {
        this.titleBar.setText('Specials');
        this.navbar.unselectAll();
        this.navbar.selectOption(3);
    }
    onMenuSelectOption4()
    {
        this.titleBar.setText('Entrées');
        this.navbar.unselectAll();
        this.navbar.selectOption(4);
    }
    onMenuSelectOption5()
    {
        this.titleBar.setText('Desserts');
        this.navbar.unselectAll();
        this.navbar.selectOption(5);
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