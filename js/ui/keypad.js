class Keypad {
    constructor(insideElem, onAdd, onRemove, onClear) {
        var el = $(`<div class="keypad"></div>`);

        this.ref = el.appendTo($(insideElem));
        this.btns = [];
        this._enabled = true;
        this.onAdd = onAdd;
        this.onRemove = onRemove;
        this.onClear = onClear;

        var row = $(`<div class="keypad-row"></div>`);
        for (var i = 0; i < 12; i++) {
            if (i % 3 == 0 && i != 0) {
                this.ref.append(row);
                row = $(`<div class="keypad-row"></div>`);
            }

            var btn;
            if (i + 1 == 10) {
                btn = $(`<div class="keypad-button ui-style-1 red"><h4>C</h4></div>`);
                btn.click(cbc(this, null, function(p, i) {
                    p.clearBtn();
                }));
            } else if (i + 1 == 11) {
                btn = $(`<div class="keypad-button ui-style-1"><h4>0</h4></div>`);
                btn.click(cbc(this, 0, function(p, i) {
                    p.addBtn(i);
                }));
            } else if (i + 1 == 12) {
                btn = $(`<div class="keypad-button ui-style-1"><h4>&lt;</h4></div>`);
                btn.click(cbc(this, null, function(p, i) {
                    p.removeBtn();
                }));
            } else {
                btn = $(`<div class="keypad-button ui-style-1"><h4>${i + 1}</h4></div>`);
                btn.click(cbc(this, i, function(p, i) {
                    p.addBtn(i + 1);
                }));
            }

            this.btns.push(btn);
            btn.appendTo(row);
        }

        this.ref.append(row);
    }

    set enabled(v) {
        if (v != this._enabled) {
            for (var i = 0; i < this.btns.length; i++) {
                if (v && this.btns[i].hasClass('disabled')) {
                    this.btns[i].removeClass('disabled');
                } else if (!v && !this.btns[i].hasClass('disabled')) {
                    this.btns[i].addClass('disabled');
                }
            }

            this._enabled = v;
        }
    }   

    get enabled() {
        return this._enabled;
    }

    addBtn(i) {
        if (!this._enabled) {
            return;
        }

        this.onAdd(i);
    }

    removeBtn() {
        if (!this._enabled) {
            return;
        }

        this.onRemove();
    }

    clearBtn() {
        if (!this._enabled) {
            return;
        }

        this.onClear();
    }

    resize() {
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].css('height', this.btns[i].css('width'));
        }
    }
}
