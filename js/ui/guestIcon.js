class GuestIcon {
    constructor(insideElem, guest) {
        this.iconWidth = GuestIcon.getIconWidth();
        this.guest = guest;
        
        // Main data of the element
        this.el = $(`
        <div class="guest-icon" style="position: absolute; left:${this.iconWidth}%; right:${this.iconWidth}%;">
            <img src=${this.guest.icon.source} style="width:${this.iconWidth}%"></img>
        </div>
        `);
        this.ref = this.el.prependTo($(insideElem));
        
        this.hide();
    }

    remove() {
        this.el.remove();
        // poof! disappeared
    }

    hide() {
        this.hidden = true;
        this.el.find($('img')).css('visibility', 'hidden');
    }

    show() {
        this.hidden = false;
        this.el.find($('img')).css('visibility', 'visible');
    }

    static getIconWidth() {
        return 12.5;
    }
}