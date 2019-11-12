class OrderItem {
    constructor(quantity, item, notes, status) {
        this.quantity = quantity; // Amount of this item
        this.item = item;         // Instance of MenuItem
        this.notes = notes;       // Extra notes for this item
        this.status = status;     // Status of delivery for this item: inprogress, or delivered
    }
}
