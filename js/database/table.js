class Table {
    constructor(number, state, guestOrders, xPos, yPos) {
        this.number = number;               // Table number
        this.state = state || 'available';  // State of the table: available, taken, or cleaning
        this.guestOrders = [];              // Array of GuestOrder
        this.x = xPos;
        this.y = yPos;

        if (this.state == 'taken') {
            this.guestOrders = guestOrders;
        }
    }
}
