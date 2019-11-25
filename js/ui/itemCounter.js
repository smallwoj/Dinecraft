class ItemCounter {
    constructor(insideElem, min, start, max, suffix = '') {
        var el = $(`
            <div class="item-counter">
                <div class="counter-btn decr-item-btn ui-style-1"><h4>-</h4></div>
                <div class="item-count"><h4>0</h4></div>
                <div class="counter-btn incr-item-btn ui-style-1"><h4>+</h4></div>
            </div>
        `);

        this.min = min;
        this.max = max;
        this._count = 0;
        this.ref = el.appendTo($(insideElem));
        this.incrBtn = this.ref.find('.incr-item-btn');
        this.decrBtn = this.ref.find('.decr-item-btn');
        
        // hey :)
        this.suffix = suffix;
    
        this.count = start;
        this.incrBtn.click(this.onIncrease.bind(this));
        this.decrBtn.click(this.onDecrease.bind(this));
    }

    onIncrease() {
        if (this._count < this.max) {
            this.count++;
        }
    }

    onDecrease() {
        if (this._count > this.min) {
            this.count--;
        }
    }

    set count(val) {
        this._count = val;
        this.ref.find('.item-count h4').text(this._count + "" + this.suffix);

        if (this._count == this.min + 1) {
            this.decrBtn.removeClass('disabled');
        }

        if (this._count == this.max) {
            this.incrBtn.addClass('disabled');
        } else {
            this.incrBtn.removeClass('disabled');
        }

        if (this._count == this.max - 1) {
            this.incrBtn.removeClass('disabled');
        }

        if (this._count == this.min) {
            this.decrBtn.addClass('disabled');
        } else {
            this.decrBtn.removeClass('disabled');
        }
    }

    get count() {
        return this._count;
    }

    resize() {
        this.incrBtn.css('width', this.incrBtn.css('height'));
        this.decrBtn.css('width', this.decrBtn.css('height'));
    }
}

