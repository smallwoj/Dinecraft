class Bill
{
    constructor(insideElem, guestOrder)
    {
        this.guestOrder = guestOrder;
        var el = $('<div class="bill ui-style-1"></div>');

        //create image
        var img = $('<div class="icon"><img src="'+guestOrder.icon.source+'.png"></div>');
        img.appendTo(el);

        var itemString = '';
        //for each item in the order, add it to the list
        for(var i = 0; i < this.guestOrder.items.length; i++)
        {
            itemString += this.guestOrder.items[i].item.name;
            if(this.guestOrder.items[i].quantity > 1)
                itemString+=' x'+this.guestOrder.items[i].quantity;
            //TODO: get number of dots for the width and everything??? oh god
            itemString+=' $'+(this.guestOrder.items[i].item.price*this.guestOrder.items[i].quantity)+'<br>';
        }
        
        var items = $('<div class="items"><h5>'+itemString+'</h5></div>');
        items.appendTo($(el));
        el.appendTo($(insideElem));
        console.log($(insideElem));
    }
} 