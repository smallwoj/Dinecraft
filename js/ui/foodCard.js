const MAX_QUANTITY = 4;

class FoodCard {
    constructor(insideElem, menuItem) {
        this.menuItem = menuItem;

        // Main data of the element
        var el = $(`
            <div class="food-card">
                <img src=${menuItem.icon.source} style="width:50%"></img>
                <h3 style="color:#5F5F5F">${menuItem.name}</h3>
                <div class="quantity-counter" style="width: 100%"></div>
                <div class="img-wrapper" style="position: relative; margin-left:auto; margin-right:auto; left:0; right:0; width:80%; height:40%;"></div>
            </div>
        `);
        $(el.find('h3')).css("margin-bottom","auto");
        this.ref = el.appendTo($(insideElem));

        // Aw geez please work
        this.quantityCounter = new ItemCounter($(el.find('.quantity-counter')), 0, 0, MAX_QUANTITY, 'x');
        $(this.ref.find('.img-wrapper')).css('background', 'url(' + window.DB.getIconByName('expand-this').getSource() + ') no-repeat center center');
    }
}