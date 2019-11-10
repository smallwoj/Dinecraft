class PinField {
    constructor(insideElem, max, onComplete) {
        this.onComplete = onComplete;
        this._enabled = true;
        this.max = max;
        this.pin = '';

        var el = $(`<div class="pin-field"></div>`);
        this.indicators = [];

        for (var i = 0; i < this.max; i++) {
            var ind = $(`<div class="pin-indicator ui-style-1"></div>`)
            this.indicators.push(ind.appendTo(el));
        }

        this.ref = el.appendTo($(insideElem));
    }

    set enabled(v) {
        if (v != this._enabled) {
            for (var i = 0; i < this.indicators.length; i++) {
                if (v && this.indicators[i].hasClass('disabled')) {
                    this.indicators[i].removeClass('disabled');
                } else if (!v && !this.indicators[i].hasClass('disabled')) {
                    this.indicators[i].addClass('disabled');
                }
            }

            this._enabled = v;
        }
    }   

    get enabled() {
        return this._enabled;
    }

    setEntered(n) {
        for (var i = 0; i < this.indicators.length; i++) {
            var p = this.indicators[i];
            if (i + 1 <= n) {
                if (!p.hasClass('entered')) {
                    p.addClass('entered');
                }
            } else {
                if (p.hasClass('entered')) {
                    p.removeClass('entered');
                }
            }
        }

        if (n == this.max) {
            this.onComplete();
        }

        this.resize();
    }

    resize() {
        for (var i = 0; i < this.indicators.length; i++) {
            this.indicators[i].css('height', this.indicators[i].css('width'))
        }
    }
}
