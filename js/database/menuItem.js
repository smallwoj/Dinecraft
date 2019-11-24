class MenuItem {
    constructor(name, category, icon, description, tags, calories, price) {
        this.name = name;         // Name of the item
        this.category = category; // Food category of this item (entree, appetizer, drink, etc)
        this.icon = icon;         // Instance of Icon, image of this item
        this.description = description; // Text description of the item
        this.tags = tags;         // Array of String, Tags for this item (dietary restrictions + others)
        this.calories = calories; // Number of calories
        this.price = price;       // Price
    }
}
