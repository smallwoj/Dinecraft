class Fab
{
    constructor(insideElem, onClick)
    {
        var el = $(`
            <div class="fab"></div>
            `);
        this.ref = el.appendTo($(insideElem));
    
        this.ref.click(onClick);
    }


}
