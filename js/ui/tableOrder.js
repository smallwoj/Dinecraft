class TableOrder {
    constructor(insideElem, guests) {
        var el = $(`
            <div class="table-order"></div>
        `);

        this.ref = el.appendTo($(insideElem));
        this.guests = guests;
    }
}