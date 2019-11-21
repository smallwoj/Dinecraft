class TableSelector
{
    constructor(insideElem, onSelect, tableData)
    {
        TableSelector.num++;
        this.onSelect = onSelect;
        this.data = tableData;
        
        var el = $('<div class="table'+TableSelector.num+' ui-style-1 table-style"><img src="./img/table.png"></div>');
        el.click(cbc(this, 0, function(p){p.onClick()}));
        this.ref = el.appendTo($(insideElem));
        var tableRef = this.ref.find(".table");
        $(`.table${TableSelector.num}`).css('left', `${map(this.data.pos.x, -1, 1, 20, 100)}%`);
        $(`.table${TableSelector.num}`).css('top', `${map(this.data.pos.y, -1, 1, 9, 100)}%`);
    }
    
    onClick()
    {
        this.onSelect(this.data);
    }
}

TableSelector.num = 0;