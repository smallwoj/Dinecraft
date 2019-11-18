//TODO - ordering page 
//topbar and icon FULL functionality
//complete database (menu items except images) 

// Controls the behaviour of the ordering page
class OrderingPage {
    constructor() {
        // Main data of the element
        //icon -> picture, title, quantity
        //detailed icon -> picture, title, quantity, tags, calories, amount/size, price, description
        var el = $(`
            <div class="ordering-page">
                <div class="main-container">
                    <div style="width: 100%; display: flex; justify-content: space-between; flex-direction:column; align-items:center">
                        <div class="sidebar-wrap"></div> //Yar's job
                        <div class="topbar-wrap"></div> //search button, category, back arrow
                        <div class="icon-wrap"></div>
                        <div class="detailedicon-wrap"></div>
                    </div>
                </div>
            </div>
        `);
        
        //"constructors" for the components
        //sidebar
        this.sidebar = new Sidebar(this.ref.find('sidebar-wrap');
        
        //topbar
        this.topbar = new Topbar(this.ref.find('topbar-wrap'
        {
            //display the title, implement 'back' feature (destroys this page), display search icon/button that actually searches 
            //(brings up keypad, finds certain items)
        });
        this.topbar.enabled=false; //enabled once they click on it 
        
        //icon
        this.icon = new Icon(this.ref.find('icon-wrap'
        {
            //display icons in rows (fit to display) with all DB components 
            //when icon is clicked on -> go to detailed icon
            //increase/decrease quantity when clicked (default=1)
        });
        //detailed icon
        this.detailedicon = new DetailedIcon(this.ref.find('detailedicon-wrap'
        {
            //show the detailed icon (icon with more DB information)
            //destroy this when tapping off the screen/sliding arrow 
        });

        // Bind what this page should do on resize
        window.onResize = this.onResize.bind(this);
    }
    //destructor
    // Removes the contents on the page and resets variables in the window
    destroy() {
        this.ref.remove();
        window.orderingPage = undefined;
        window.onResize = undefined;
    }
    //other methods to update the state 
    //dynamic sizing!
    //onSearchSelect
    //onBackSelect
    //onIconSelect
    //onDetailedIconDeselect
    //onKeyPad select - search 
    //thamks 
        