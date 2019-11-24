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

        //randomly select the image to use for this table
        if(Math.floor(Math.random() * 2) === 1)
        {
            this.tableData.img = './img/table.png';
        }
        else
        {
            this.tableData.img = './img/table2.png';
        }
        
        //create the html element
        var el = $('<div class="table'+this.tableData.number+' ui-style-1 table-style"><img src="'+this.tableData.img+'"></div>');
        //set what happens when you click on the table
        el.click(cbc(this, 0, function(p){p.onClick()}));
        //if this table needs cleaning, show the icon
        if(this.data.state === 'cleaning')
        {
            var elohel = $('<div class="clean-wrap"><div class="clean"><img src="./img/spraybottle-standard-2.png" style="height:150%;"></div></div>');
            elohel.appendTo($(el));
        }
        //insert the html elemnt
        this.ref = el.appendTo($(insideElem));

        //call the resize method to correctly position the table
        this.onResize();
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
