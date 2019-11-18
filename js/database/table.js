class Table {
    constructor(number, state, guestOrders, pos, num) {
        this.number = number;               // Table number
        this.state = state || 'available';  // State of the table: available, taken, or cleaning
        this.guestOrders = [];              // Array of GuestOrder
        this.pos = pos;
        this.number = num;

        if (this.state == 'taken') {
            this.guestOrders = guestOrders;
        }
    }
}
