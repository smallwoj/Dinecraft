class FoodCard {
    constructor(insideElem, menuItem) {
        this.menuItem = menuItem;

        // Main data of the element
        var el = $(`
            <div class="food-card">
                <h4>${menuItem.name}</h4>
            </div>
        `);
        this.ref = el.appendTo($(insideElem));
    }
}