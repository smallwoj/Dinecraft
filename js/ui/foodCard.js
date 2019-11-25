const MAX_QUANTITY = 4;

class FoodCard {
    constructor(insideElem, menuItem) {
        this.menuItem = menuItem;

        // Main data of the element
        var el = $(`
            <div class="food-card">
            <div class="food-card-top">
                <img src=${menuItem.icon.source} style="width:50%; max-width:64px;"></img>
                <div class="text"><h5 style="color:#5F5F5F">${menuItem.name}</h5></div>
            </div>
            <div class="food-card-bottom">
                <div class="quantity-counter" style="width: 100%; margin-bottom:5%;"></div>
                <div class="img-wrapper" style="position: relative; margin-left:auto; margin-right:auto; width:100%;"><img src="./img/expandthis.png" width=100%></div>
            </div>
            </div>
        `);

        //$(el.find('.quantity-counter')).css("margin-top","auto");
        this.ref = el.appendTo($(insideElem));

        // Aw geez please work
        this.quantityCounter = new ItemCounter($(el.find('.quantity-counter')), 0, 0, MAX_QUANTITY, 'x');
        $(el.find('.item-counter')).css('width', '75%');
    }
}