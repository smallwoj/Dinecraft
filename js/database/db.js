// Our fake database
window.DB = {
    icons: [],
    accounts: [],
    menuItems: [],
    tables: [],
};

// This will fill window.DB with all the fake data we need
window.DB.createFakeData = function() {
    window.DB.icons.push(new Icon('userAcc1', './img/userAccount1.jpg'));

    window.DB.accounts.push(new Account('Employee 1', '420420', window.DB.getIconByName('userAcc1')));
    window.DB.accounts.push(new Account('Mr. Krabs', '333333', window.DB.getIconByName('userAcc1')));
    window.DB.accounts.push(new Account('Pickaxe Guy', '481516', window.DB.getIconByName('userAcc1')));
    window.DB.accounts.push(new Account('Joe mama', '696969', window.DB.getIconByName('userAcc1')));
};

// Returns: Icon, does a lookup on a database to return Icon with the provided name
window.DB.getIconByName = function(name) {
    for (var i = 0; i < window.DB.icons.length; i++) {
        if (window.DB.icons[i].getName() === name) {
            return window.DB.icons[i];
        }
    }
}



