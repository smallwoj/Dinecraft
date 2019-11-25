class Dropdown {
    constructor(insideElem, onSelect, opts) {
        var el = $(`
            <div class="dropdown">
                <div class="dropdown-field ui-style-1"></div>
                <div class="dropdown-pane ui-style-1"></div>
            </div>
        `);

        this.ref = el.appendTo($(insideElem));
        this.field = this.ref.find('.dropdown-field');
        this.pane = this.ref.find('.dropdown-pane');
        this._selected = -1;
        this.onSelect = onSelect;

        for (var i = 0; i < opts.options.length; i++) {
            var option = opts.options[i];
            var optElem = $(`
                <div class="dropdown-item"></div>
            `);

            if (option.icon)
                optElem.append(`<div class="dropdown-item-icon"><img src="${option.icon.getSource()}"></div>`);

            if (option.text)
                optElem.append(`<div class="dropdown-item-text"><h4>${option.text}</h4></div>`);

            optElem.click(cbc(this, i, function(p, i) {
                p.selected = i;
            }));

            this.pane.append(optElem);
        }

        this.field.click(this.onFieldClick.bind(this));

        if (opts.defText) {
            this.field.append(`
                <div class="dropdown-item">
                    <div class="dropdown-item-icon"><img src="./img/bruh_spacer.png"></div>
                    <div class="dropdown-item-text"><h4>${opts.defText}</h4></div>
                </div>
            `);
        }


        $(document).click((function(event) {
              var t = $(event.target);
                console.log(t.closest(this.pane))
              if(!t.closest(this.pane).length
                  && !t.closest(this.field).length && this.pane.is(":visible")) {
                      this.pane.hide();
              }
        }).bind(this));
    }

    get selected() {
        return this._selected;
    }

    set selected(v) {
        if (v != this._selected) {
            this.pane.find('.dropdown-item').eq(this._selected).removeClass('selected');
            this._selected = v;

            var sel = this.pane.find('.dropdown-item').eq(this._selected);
            this.field.empty();
            this.field.append(sel.clone());
            sel.addClass('selected');
        }

        this.onSelect();
        //this.pane.slideUp();
        this.pane.hide();
    }

    onFieldClick() {
        //this.pane.slideDown();
        this.pane.show();
    }

    // TODO: we might need an onOutsideClick to hide the pane when user clicks outside of the pane.
    //   This is not a priority and would be a pain to implement
}

