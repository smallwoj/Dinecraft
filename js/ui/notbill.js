// Starting with Bill and then adapting it to work with the single table display

class NotBill
{
    constructor(insideElem, guestOrder)
    {
        this.guestOrder = guestOrder;
        this.el = $('<div class="not-bill ui-style-1"><div class="bill-top"></div><div class="bill-bottom"></div></div>');
        var top = this.el.find('.bill-top');
        var bottom = this.el.find('.bill-bottom');
        this.totalPrice = 0;
        //create image
        
        console.log(this.guestOrder.icon.getSource());

        var guestIcon = $('<div class="guest-icon" align="center"><img src="'+this.guestOrder.icon.getSource()+'"></div>');
        $(guestIcon).css('width', '100%');
        $(guestIcon).css('height', 'auto');
        $(guestIcon.find('img')).css('width', '30%');
        $(guestIcon.find('img')).css('max-width', '64px');
        guestIcon.appendTo($(this.el));

        var items = $('<div class="items"></div>');
        //for each item in the order, add it to the list
        for(var i = 0; i < this.guestOrder.items.length; i++)
        {
            var itemName = $('<div class="item-name"></div>')
            var itemNameString = this.guestOrder.items[i].item.name;
            if(this.guestOrder.items[i].quantity > 1)
                itemNameString+=' x'+this.guestOrder.items[i].quantity;
            itemName.html(itemNameString);
            itemName.appendTo(items);
            var priceString ='$'+(this.guestOrder.items[i].item.price*this.guestOrder.items[i].quantity);
            var price = $('<div class="price" align="right"></div>');
            price.html(priceString);
            price.appendTo(items);
            this.totalPrice += this.guestOrder.items[i].item.price*this.guestOrder.items[i].quantity;
        }
        items.appendTo($(top));

        var total = $('<div class="total" align="center"></div>')
        total.html('<h4>TOTAL: <font color="#218306">$'+this.totalPrice+'</font>');
        total.appendTo(bottom);

        var addButton = $(`<div class="add-button ui-style-1" align="center"><h4>➕</h4></div>`);
        addButton.appendTo(bottom);
        $(bottom.find('.add-button')).click(this.onAdd.bind(this));

        top.appendTo(this.el);
        bottom.appendTo(this.el);
        this.ref = this.el.appendTo($(insideElem));

        this.hide();
    }

    show() {
        $(this.el).css('visibility', 'visible');
    }

    hide() {
        console.log(this.el.find('.bill'))
        $(this.el).css('visibility', 'hidden');
    }
    
    onAdd() {
        window.appPage.destroy();
        window.currOrder = this.guestOrder;
        window.createorderingPage();
    }
}
