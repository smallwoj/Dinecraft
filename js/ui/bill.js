class Bill
{
    constructor(insideElem, guestOrder)
    {
        this.guestOrder = guestOrder;
        var el = $('<div class="bill ui-style-1"></div>');
        this.totalPrice = 0;
        //create image
        var img = $('<div class="guest-icon"></div>');
        $(img).css('background', 'url(' + guestOrder.icon.source + '.png) no-repeat center center');
        $(img).css('background-size', '30%');
        console.log(img)
        img.appendTo(el);

        var items = $('<div class="items"></div>');
        //for each item in the order, add it to the list
        for(var i = 0; i < this.guestOrder.items.length; i++)
        {
            var itemName = $('<div class="item-name"></div>')
            var itemNameString = this.guestOrder.items[i].item.name;
            if(this.guestOrder.items[i].quantity > 1)
                itemNameString+=' x'+this.guestOrder.items[i].quantity;
            itemName.html('<h4>'+itemNameString+'</h4>');
            itemName.appendTo(items);
            //TODO: split prices and item name into separate divs
            var priceString ='$'+(this.guestOrder.items[i].item.price*this.guestOrder.items[i].quantity);
            var price = $('<div class="price" align="right"></div>');
            //price.html('<font color="#218306"><h4>'+priceString+'</h4></font>');
            price.html('<h4>'+priceString+'</h4>');
            $(price).css('color','#123123');
            price.appendTo(items);
            this.totalPrice += this.guestOrder.items[i].item.price*this.guestOrder.items[i].quantity;
        }
        items.appendTo($(el));

        var total = $('<div class="total" align="center"></div>')
        total.html('<h4>TOTAL: $'+this.totalPrice)
        total.appendTo(el);
        el.appendTo($(insideElem));
    }
} 