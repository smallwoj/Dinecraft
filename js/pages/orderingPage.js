// Controls the behaviour of the ordering page
var length;
class orderingPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="ordering-page">
            <div class="dark-overlay"></div>
                <div class="content-pane">
                    <div style="width: 100%; height:100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center;position:relative;z-index:1;">
                        <div class="foodcard-wrap" style="height:100%;width:100%;"></div>
                        <div class="detailedfoodcard-wrap"></div>

                    </div>
                    <div class="back-btn-cox"></div>
                    <div class="apply-order-btn"></div>

                </div>
            </div>
        `);
      
        this.tempOrderState = {
            // represented like: 'food_name': amount,
        };

        // Fill out existing order
        for (var i = 0; i < window.currTable.guestOrders[window.currOrder].items.length; i++) {
            this.tempOrderState[window.currTable.guestOrders[window.currOrder].items[i].item.name] = window.currTable.guestOrders[window.currOrder].items[i].quantity;
        }

        //define other elements (titleBar, navBar, icons)
        
        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        this.backBtn = new Fab(this.ref.find('.back-btn-cox'), (function() {
            this.destroy();
            window.createSingleTablePage();
        }).bind(this));

        this.applyOrderBtn = new Fab(this.ref.find('.apply-order-btn'), (function() {
            // O(n^2) baby yea
            for (var i = 0; i < Object.keys(this.tempOrderState).length; i++) {
                var found = false;
                for (var j = 0; j < window.currTable.guestOrders[window.currOrder].items.length; j++) {
                    if (window.currTable.guestOrders[window.currOrder].items[j].item.name === Object.keys(this.tempOrderState)[i]) {
                        found = true;
                        window.currTable.guestOrders[window.currOrder].items[j].quantity = Object.values(this.tempOrderState)[i];
                        break;
                    }
                }

                if (found) {
                    continue;
                } else {
                    window.currTable.guestOrders[window.currOrder].items.push(new OrderItem(
                        Object.values(this.tempOrderState)[i],
                        window.DB.getMenuItemByName(Object.keys(this.tempOrderState)[i]),
                        null,
                        null
                    ));
                }
            }
            this.destroy();
            window.createSingleTablePage();

        }).bind(this));

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
            'text' : 'Entrées',
            'onClick' : this.onMenuSelectOption3.bind(this)
            },
        {
            'text' : 'Desserts',
            'onClick' : this.onMenuSelectOption4.bind(this)
            }];

        this.navbar = new NavBar(this.ref, navbarOpts);
        
        this.titleBar = new TitleBar(this.ref.find('.content-pane'), 'Drinks', this.onSearchInputChange.bind(this));
         
        $(this.ref.find('.title-bar')).css('position', 'relative');
        $(this.ref.find('.title-bar')).css('z-index', '5');
                
        this.foodCards=[];
        this.onMenuSelectOption1()
        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
        this.onResize();
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
    
    onSearchInputChange(searchText)
    {
        searchText=searchText.toUpperCase()
        switch(searchText)
        {
        case 'VEGETARIAN': 
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        var values=[10, 11, 12, 14, 20, 21, 22, 23, 24, 25]; 
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 10; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[values[i]]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=10;
        break;
        case 'VEGAN': 
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        var values=[10, 11, 12, 14, 20, 22, 23];
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 7; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[values[i]]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=7; break;
        case 'GLUTEN FREE': 
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        var values=[10, 14, 20, 23];
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 4; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[values[i]]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=4; 
        break;
        case 'MEAT': 
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        var values=[9, 13, 15, 16, 17, 18, 19];
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 7; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[values[i]]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=7; break;
        case 'SOUP': 
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        var values=[9, 10];
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 2; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[values[i]]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=2; break;
        break;
        case '':
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 9; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
            if (this.tempOrderState[window.DB.menuItems[values[i]].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[values[i]].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, [i, values[i]], function(p, n) {
                p.tempOrderState[window.DB.menuItems[n[1]].name] = p.foodCards[n[0]].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=9;
        default: //no results found shit 
        }        this.onResize();
    }


    /////////////////////////////
    onFoodCardSelect()
    {
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
        
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 9; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
            if (this.tempOrderState[window.DB.menuItems[i].name] !== undefined) {
                this.foodCards[i].quantityCounter.count = this.tempOrderState[window.DB.menuItems[i].name];
            }

            this.foodCards[i].quantityCounter.onValChange = (cbc(this, i, function(p, n) {
                p.tempOrderState[window.DB.menuItems[n].name] = p.foodCards[n].quantityCounter.count;
            }));
        }

        foodCardWrap.append(row);  
        length=9;        
        this.onResize();
    }
    onMenuSelectOption2()
    {
        this.titleBar.setText('Appetizers');
        this.navbar.unselectAll();
        this.navbar.selectOption(2);
        
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 9; i < 15; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));

            if (this.tempOrderState[window.DB.menuItems[i].name] !== undefined) {
                this.foodCards[i-9].quantityCounter.count = this.tempOrderState[window.DB.menuItems[i].name];
            }

            this.foodCards[i-9].quantityCounter.onValChange = (cbc(this, i, function(p, n) {
                p.tempOrderState[window.DB.menuItems[n].name] = p.foodCards[n-9].quantityCounter.count;
            }));

        }

        foodCardWrap.append(row);  
        length=6;
        this.onResize();
    }

    onMenuSelectOption3()
    {
        this.titleBar.setText('Entrées');
        this.navbar.unselectAll();
        this.navbar.selectOption(3);
        
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 15; i < 21; i++) {
            if (i % 5 == 0 && i != 0) {
                if(!($(row).html()===''))
                    foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
            if (this.tempOrderState[window.DB.menuItems[i].name] !== undefined) {
                this.foodCards[i-15].quantityCounter.count = this.tempOrderState[window.DB.menuItems[i].name];
            }

            this.foodCards[i-15].quantityCounter.onValChange = (cbc(this, i, function(p, n) {
                p.tempOrderState[window.DB.menuItems[n].name] = p.foodCards[n-15].quantityCounter.count;
            }));


        }
        if(!($(row).html()===''))
            foodCardWrap.append(row);  
        length=6;
        this.onResize();
    }
    onMenuSelectOption4()
    {
        this.titleBar.setText('Desserts');
        this.navbar.unselectAll();
        this.navbar.selectOption(4);
        
        $('.food-card-row').remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 21; i < 26; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
            if (this.tempOrderState[window.DB.menuItems[i].name] !== undefined) {
                this.foodCards[i-21].quantityCounter.count = this.tempOrderState[window.DB.menuItems[i].name];
            }

            this.foodCards[i-21].quantityCounter.onValChange = (cbc(this, i, function(p, n) {
                p.tempOrderState[window.DB.menuItems[n].name] = p.foodCards[n-21].quantityCounter.count;
            }));
        }

        foodCardWrap.append(row);  
        length=5;
        this.onResize();
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

        for (var i = 0; i < this.foodCards.length; i++) {
            this.foodCards[i].resize();
        }
    }
}     
