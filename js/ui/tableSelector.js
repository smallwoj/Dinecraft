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
        //increment the current number of tables
        TableSelector.num++;
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
        var el = $('<div class="table'+TableSelector.num+' ui-style-1 table-style"><img src="'+this.tableData.img+'"></div>');
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
        $(`.table${TableSelector.num}`).css('left', `${map(this.data.pos.x, -1, 1, 20, 100)}%`);
        $(`.table${TableSelector.num}`).css('top', `${map(this.data.pos.y, -1, 1, 9, 100)}%`);
    }
    
    /**
     * When this button is clicked, it will select this table.
     */
    onClick()
    {
        this.onSelect(this.data);
    }
}

//static variable to keep track of the number of tables
TableSelector.num = 0;