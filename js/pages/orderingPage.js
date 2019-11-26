// Controls the behaviour of the ordering page
var length;
class orderingPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="ordering-page">
            <div class="dark-overlay"></div>
                <div class="content-pane">
                    <div style="width: 100%; height:100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center;z-index:2;">
                        <div class="foodcard-wrap" style="height:100%;"></div>
                        <div class="detailedfoodcard-wrap"></div>
                    <div class="back-btn-wrapjjgejrhgjureh-sd"></div>
                    <div class="apply-order-btn"></div>


                    </div>
                </div>
            </div>
        `);

        //
       // $(el.find('.popup-overlay')).css('z-index', '0');
        
        //define other elements (titleBar, navBar, icons)
        
        // Append it to body and set the proper panorama image (none in this case)
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        this.backBtn = new Fab(this.ref.find('.back-btn-wrapjjgejrhgjureh-sd'), (function() {
            this.destroy();
            window.createSingleTablePage();
        }).bind(this));

        this.applyOrderBtn = new Fab(this.ref.find('.apply-order-btn'), (function() {
            alert("TODO: THIS. Adding the temporary order to the correct guest.");
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
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 0; i < 9; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);
        length=9;

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
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=10;
        break;
        case 'VEGAN': 
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=7; break;
        case 'GLUTEN FREE': 
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=4; 
        break;
        case 'MEAT': 
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=7; break;
        case 'SOUP': 
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=2; break;
        break;
        case '':
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=9;
        default: //no results found shit 
        }
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
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=9;        
    }
    onMenuSelectOption2()
    {
        this.titleBar.setText('Appetizers');
        this.navbar.unselectAll();
        this.navbar.selectOption(2);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=6;
    }

    onMenuSelectOption3()
    {
        this.titleBar.setText('Entrées');
        this.navbar.unselectAll();
        this.navbar.selectOption(3);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
        this.foodCards=[];
        //create all the food cards 
        var foodCardWrap = this.ref.find(".foodcard-wrap");
        
        var row = $(`<div class="food-card-row"></div>`);
        for (var i = 15; i < 21; i++) {
            if (i % 5 == 0 && i != 0) {
                foodCardWrap.append(row);
                row = $(`<div class="food-card-row"></div>`);
            }

            this.foodCards.push(new FoodCard(row, window.DB.menuItems[i]));
        }

        foodCardWrap.append(row);  
        length=6;
    }
    onMenuSelectOption4()
    {
        this.titleBar.setText('Desserts');
        this.navbar.unselectAll();
        this.navbar.selectOption(4);
        
        for (var i = 0; i < length; i++)
            this.foodCards[i].ref.remove();
         
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
        }

        foodCardWrap.append(row);  
        length=5;
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
