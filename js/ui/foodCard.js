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
                <div class="price"><h5 style="color:#218306">$${menuItem.price}</h5></div>
            </div>
            <div class="food-card-bottom">
                <div class="quantity-counter" style="width: 100%; margin-bottom:5%;"></div>
                <div class="additional-details"></div>
                <div class="img-wrapper" style="position: relative; margin-left:auto; margin-right:auto; width:100%; margin-bottom:1%;"><img src="./img/expandthis.png" width=100%></div>
            </div>
            </div>
        `);

        this.ref = el.appendTo($(insideElem));

        // Aw geez please work
        this.quantityCounter = new ItemCounter($(el.find('.quantity-counter')), 0, 0, MAX_QUANTITY, 'x');
        $(el.find('.item-counter')).css('width', '75%');
        $(el.find('.img-wrapper')).click(this.showDetailedStuff.bind(this));
    }

    showDetailedStuff()
    {
        var el = $(`
        <div class="desc" style="margin-bottom:2%"><h6 style="color:#5F5F5F">${this.menuItem.description}</h6></div>
        <div class="tags" style="margin-bottom:2%"></div>
        <div class="calories" style="margin-bottom:2%"></div>
        `);
        el.appendTo($(this.ref.find('.additional-details')));
        var tags = '<h6 style="color:#5F5F5F">';
        for(var i = 0; i < this.menuItem.tags.length; i++)
        {
            tags+=this.menuItem.tags[i]+' ';
        }
        tags+='</h6>';
        $(this.ref.find('.tags')).html(tags);

        var calories = `<h6 style="color:#5F5F5F">${this.menuItem.calories} calorie`;
        if(this.menuItem.calories!=1&&this.menuItem.calories!=-1)
            calories += 's';
        calories+='</h6>';
        $(this.ref.find('.calories')).html(calories);
        $(this.ref.find('.img-wrapper').find('img')).css('transform', 'scale(1, -1)');
        $(this.ref.find('.img-wrapper')).click(this.showntDetailedStuff.bind(this));
    }

    showntDetailedStuff()
    {
        $(this.ref.find('.additional-details')).html('');
        $(this.ref.find('.img-wrapper').find('img')).css('transform', 'scale(1, 1)');
        $(this.ref.find('.img-wrapper')).click(this.showDetailedStuff.bind(this));
    }

    resize() {
        this.quantityCounter.resize();
    }
}
