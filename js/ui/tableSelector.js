class TableSelector //class for a button that selects a table to go to the next page
{
    /**
     * its a constructor
     * @param {html element} insideElem - The html element this will be located in.
     * @param {function} onSelect - The function for what happens when this table selector is selected.
     * @param {Table} tableData - The database entry for this table.
     */
    constructor(insideElem, onSelect, tableData)
    {
        //load parameters
        this.onSelect = onSelect;
        this.data = tableData;
        this.tableData = tableData;
        
        //create the html element
        var el = $('<div class="table'+this.tableData.number+' ui-style-1 table-style"><img src="'+this.tableData.img+'"></div>');
        //set what happens when you click on the table
        el.click(cbc(this, 0, function(p){p.onClick()}));
        //if this table needs cleaning, show the icon
        if(this.data.state === 'taken')
        {//if there are people whose order has been taken, draw them
            var guests = $('<div class="guests-wrap" align="center"></div>')
            for(var i = 0; i < this.data.guestOrders.length; i++)
            {
                var guest = $(`<div class="guest${i+1}"><img src="${this.data.guestOrders[i].icon.source}.png"></div>`);
                $(guest.find('img')).css('width', '28px');
                $(guest).css('position', 'absolute');
                guest.appendTo(guests);
            }
            $(guests.find(`.guest1`)).css('transform', 'translate(35%, -300%)');
            $(guests.find(`.guest2`)).css('transform', 'translate(200%, -135%)');
            $(guests.find(`.guest3`)).css('transform', 'translate(30%, 30%)');
            $(guests.find(`.guest4`)).css('transform', 'translate(-135%, -135%)');
            guests.appendTo(el);
        }
        //insert the html elemnt
        this.ref = el.appendTo($(insideElem));

        this.checkClean();

        //call the resize method to correctly position the table
        this.onResize();
    }

    checkClean()
    {
        if(this.tableData.state === 'cleaning')
        {
            var elohel = $('<div class="clean-wrap"><div class="clean"><img src="./img/spraybottle-standard-2.png" style="height:150%;"></div></div>');
            elohel.appendTo($(this.ref));
        }
    }
    
    /**
     * When this button is clicked, it will select this table.
     */
    onClick()
    {
        this.onSelect(this.data);
    }

    /**
     * This method, when the window is resized, will reposition the table.
     */
    onResize()
    {
        $(`.table${this.tableData.number}`).css('left', `${map(this.data.pos.x, -1, 1, 0, 100)}%`);
        $(`.table${this.tableData.number}`).css('top', `${map(this.data.pos.y, -1, 1, 0, 100)}%`);    
        $(`.table${this.tableData.number}`).css('margin-left', `-24px`);    
        $(`.table${this.tableData.number}`).css('margin-top', `-24px`);    
    }
}
