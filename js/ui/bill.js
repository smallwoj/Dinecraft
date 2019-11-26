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
        var guestIcon = $('<div class="guest-icon" align="center"><img src="'+this.guestOrder.icon.source + '"></div>');
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
        this.ref = el.appendTo($(insideElem));
    }
    
    
    onCash()
    {
        $('.popup-overlay').remove(); $('.popup').remove();
        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
        <div class="popup ui-style-1">
            <div class="popup-top-third">
                <h4>Total is <font color="#218306">$${this.totalPrice}</font></h4>
            </div>
            <div class="popup-middle-third">                
                <input class="acc-input" type="number" id="cash" name="username" placeholder="$ amount of cash given" size=30 required>
                
                <div class="cash-error-message"></div>
            </div>
            <div class="popup-bottom-third">
                <div class="popup-enter"><h4>Enter</h4></div>
            </div>
        </div>
        `);
        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-enter').click(this.enterCash.bind(this));
    }

    enterCash()
    {
        //error handling please
        if($('.acc-input').val() >= this.totalPrice)
            this.finishPayment('cash',  $('.acc-input').val() - this.totalPrice);
        else if($('.acc-input').val() == '')
            $('.cash-error-message').html("Please enter a number.");
        else
            $('.cash-error-message').html("Not enough money!");
    }
    
    onCreditOrDebit(option)
    {
        $('.popup-overlay').remove(); $('.popup').remove();
        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
        <div class="popup ui-style-1">
            <div class="popup-top" align="center"><h4>Paying with ${option}...</h4>
            </div>
            <div class="popup-bottom">
                <div class="popup-ok ui-style-1"><h4>Done</h4></div>
            </div>
        </div>
        `);
        $('.popup-ok').css("width", '100%');
        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-ok').click(this.finishPayment.bind(this, option));
    }

    askPayment()
    {
        if($(this.ref.find('.payment-button')).hasClass('disabled')) 
        {
            return;
        }
        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
            <div class="popup ui-style-1">
                <div class="popup-top" align="center"><h4>How will customer <img src="${this.guestOrder.icon.source}"> be paying?</h4></div>
                <div class="popup-bottom">
                    <div class="popup-cancel ui-style-1"><h4>Cancel</h4></div>
                    <div class="popup-cash ui-style-1"><h4>Cash</h4></div>
                    <div class="popup-credit ui-style-1"><h4>Credit</h4></div>
                    <div class="popup-debit ui-style-1"><h4>Debit</h4></div>
                </div>
            </div>
        `);
        $($("body").find('.popup').find('img')).css('width', '24px');
        $($("body").find('.popup').find('img')).css('image-rendering', 'pixelated');

        $($("body").find('.popup-top')).css('margin', '2%');

        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
        $('.popup-cash').click(this.onCash.bind(this));
        $('.popup-credit').click(this.onCreditOrDebit.bind(this, 'credit'));
        $('.popup-debit').click(this.onCreditOrDebit.bind(this, 'debit'));
        $('.popup-cancel').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
    }

    finishPayment(option, change = undefined)
    {
        $('.popup-overlay').remove(); $('.popup').remove();
        $('body').prepend(`<div class="popup-overlay"></div>`);
        $('body').prepend(`
            <div class="popup ui-style-1">
                <div class="popup-top" align="center"></div>
                <div class="popup-bottom">
                    <div class="popup-ok ui-style-1"><h4>Ok</h4></div>
                </div>
            </div>
        `);
        $('.popup-ok').css("width", '100%');
        this.paid = true;
        $(this.ref.find('.payment-button')).html('<h4><i>Paid!</i></h4>');
        $(this.ref.find('.payment-button')).addClass('disabled');
        if(option === 'cash')
        {
            $('.popup-top').html(`<h4>The total change is <font color="#218306">$${change}</font></h4>`)
        }
        else
        {
            $('.popup-top').html(`<h4>Finished paying!</h4>`)
        }
        $('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); window.appPage.checkAllPaid(); });
        $('.popup-ok').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); window.appPage.checkAllPaid(); });
    }
}
