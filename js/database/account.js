class Account {
    constructor(name, pin, role, icon) {
        this.name = name; // Name of the account
        this.pin = pin;   // PIN for this account, type is String
        this.role = role; // 'server' or 'manager'
        this.icon = icon; // Instance of Icon, profile image
    }
}
