class TableSelector
{
    constructor(insideElem, onSelect, tableData)
    {
        TableSelector.num++;
        this.onSelect = onSelect;
        this.data = tableData;

        if(Math.floor(Math.random() * 2) === 1)
        {
            tableData.img = './img/table.png';
        }
        else
        {
            tableData.img = './img/table2.png';
        }
        
        var el = $('<div class="table'+TableSelector.num+' ui-style-1 table-style"><img src="'+tableData.img+'"></div>');
        el.click(cbc(this, 0, function(p){p.onClick()}));
        //var tableRef = this.ref.find(`.table${TableSelector.num}`);
        if(this.data.state === 'cleaning')
        {
            var elohel = $('<div class="clean-wrap"><div class="clean"><img src="./img/spraybottle-standard-2.png" style="height:150%;"></div></div>');
            elohel.appendTo($(el));
        }
        this.ref = el.appendTo($(insideElem));
        $(`.table${TableSelector.num}`).css('left', `${map(this.data.pos.x, -1, 1, 20, 100)}%`);
        $(`.table${TableSelector.num}`).css('top', `${map(this.data.pos.y, -1, 1, 9, 100)}%`);
    }
    
    onClick()
    {
        this.onSelect(this.data);
    }
}

TableSelector.num = 0;