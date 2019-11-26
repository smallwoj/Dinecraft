class Table {
    // Entry for a single table in the database
    constructor(number, state, guestOrders, pos) {
        this.number = number;               // Table number
        this.state = state || 'available';  // State of the table: available, taken, or cleaning
        this.guestOrders = [];              // Array of GuestOrder
        this.pos = pos;                     // Position in the table map
        this.img = '';                      // Image used to represent the table

        //randomly select the image to use for this table
        if(Math.floor(Math.random() * 2) === 1)
        {
            this.img = './img/table.png';
        }
        else
        {
            this.img = './img/table2.png';
        }

        if (this.state == 'taken') {
            this.guestOrders = guestOrders;
        }
    }
}
