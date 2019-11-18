class TableSelector
{
    constructor(insideElem, onSelect, tableData)
    {
        this.onSelect = onSelect;
        this.data = tableData;

        var el = $(`
            <div class="table ui-style-1"></div>
        `);
        el.click(cbc(this, 0, this.onClick()));
        this.ref = el.appendTo($(insideElem));
        this.tableRef = this.ref.find(".table");

    }

    onClick()
    {
        this.onSelect(data);
    }
}
