class ItemCard {
    constructor(insideElem, menuItem) {
        var el = $(`
            <div class="item-card">
            </div>
        `);

        this.ref = el.appendTo($(insideElem));
        this.counter = new ItemCounter(elem, 0, 0, 10);
    }

    resize() {
        this.counter.resize();
    }
}

