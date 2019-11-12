class Table {
    constructor(number, state, guestOrders) {
        this.number = number;               // Table number
        this.state = state || 'available';  // State of the table: available, taken, or cleaning
        this.guestOrders = [];              // Array of GuestOrder

        if (this.state == 'taken') {
            this.guestOrders = guestOrders;
        }
    }
}
