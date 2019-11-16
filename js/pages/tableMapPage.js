// Controls the behaviour of the table map page
class TableMapPage {
    constructor() {
        // Main data of the element
        var el = $(`
            <div class="table-map-page">
                <div class="main-container">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="tables-wrap"></div>
                    </div>
                </div>
            </div>
        `);

        // Append it to body and set the proper panorama image
        this.ref = el.appendTo($('body'));
        $('body').css('background-image', '');

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }

    // Removes the contents on the page and resets variables in window
    destroy() {
        this.ref.remove();
        window.loginPage = undefined;
        window.onResize = undefined;
    }

    // Dynamic sizes yeah
    onResize() {}
}

