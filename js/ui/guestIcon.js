class GuestIcon {
    constructor(insideElem, guest) {
        GuestIcon.num++;
        this.iconWidth = GuestIcon.getIconWidth();
        this.guest = guest;
        var translate;
        if(GuestIcon.num === 1)
            translate = 'transform: translate(0, -900%);';
        else if(GuestIcon.num === 2)
            translate = 'transform: translate(-50%, -500%);';
        else if(GuestIcon.num === 3)
            translate = 'transform: translate(50%, -500%);';
        else if(GuestIcon.num === 4)
            translate = 'transform: translate(0, -100%);'

        // Main data of the element
        this.el = $(`
        <div class="guest-icon${GuestIcon.num}" style="position: absolute; left:${this.iconWidth}%; right:${this.iconWidth}%; ${translate}">
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
        $(this.el.find('img')).css('visibility', 'hidden');
    }

    show() {
        this.hidden = false;
        $(this.el.find('img')).css('visibility', 'visible');
    }

    static getIconWidth() {
        return 12.5;
    }
}
GuestIcon.num = 0;
