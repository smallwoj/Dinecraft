class Table {
    // Entry for a single table in the database
    constructor(number, state, guestOrders, pos) {
        this.number = number;               // Table number
        this.state = state || 'available';  // State of the table: available, taken, or cleaning
        this.guestOrders = [];              // Array of GuestOrder
        this.pos = pos;                     // Position in the table map
        this.img = '';                      // Image used to represent the table

        if (this.state == 'taken') {
            this.guestOrders = guestOrders;
        }
    }
}
