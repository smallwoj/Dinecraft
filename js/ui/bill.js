class Bill
{
    constructor(insideElem, guestOrder)
    {
        this.guestOrder = guestOrder;
        var el = $('<div class="bill ui-style-1"><div class="bill-top"></div><div class="bill-bottom"></div></div>');
        var top = el.find('.bill-top');
        var bottom = el.find('.bill-bottom');
        this.totalPrice = 0;
        //create image
        var guestIcon = $('<div class="guest-icon" align="center"><img src="'+this.guestOrder.icon.source + '.png"></div>');
        $(guestIcon).css('width', '100%');
        $(guestIcon).css('height', 'auto');
        $(guestIcon.find('img')).css('width', '30%');
        $(guestIcon.find('img')).css('max-width', '64px');
        guestIcon.appendTo($(el));

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

        var paymentButton = $(`<div class="payment-button ui-style-1" align="center"><h4>Pay</h4></div>`);
        paymentButton.appendTo(bottom);
        $(bottom.find('.payment-button')).click(this.askPayment.bind(this));

        top.appendTo(el);
        bottom.appendTo(el);
        el.appendTo($(insideElem));
    }

    askPayment()
    {
        console.log(this);
        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
            <div class="popup ui-style-1">
                <div class="popup-top"><h4>How will customer <img src="${this.guestOrder.icon.source}.png"> be paying?</h4></div>
                <div class="popup-bottom">
                    <div class="popup-cash ui-style-1"><h4>No</h4></div>
                    <div class="popup-credit ui-style-1"><h4>Yes</h4></div>
                    <div class="popup-debit ui-style-1"><h4>seirullkjfd</h4></div>
                    <div class="popup-cancel ui-style-1"><h4>Cancel</h4></div>
                </div>
            </div>
        `);
        $($("body").find('.popup').find('img')).css('width', '24px');
        $($("body").find('.popup').find('img')).css('image-rendering', 'pixelated');
    
        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-no').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-yes').click(function(e) { onAgree(); $('.popup-overlay').remove(); $('.popup').remove();});
    }
} 