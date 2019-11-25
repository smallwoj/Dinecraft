// Function to check if the current window layout is in landscape.
// Returns: true if the window is landscape, false if in portrait
window.isLandscape = function() {
    return $(window).width() >= $(window).height();
};

// Once the page is loaded, do stuff. Fired only once
$(document).ready(function() {
    window.DB.createFakeData();

    // Start with a login page
    //window.createLoginPage();

    // DEBUG: start with a table map page haha just kidding I mean new account page
    window.auth = window.DB.accounts[1];
    window.createTableMapPage();
//    window.createNewAccountPage();

    // Fire on resize to scale the generated page
    onResize();
});

// Creates a log in page
window.createLoginPage = function() {
    window.appPage = new LoginPage();
}

// Creates a table map page
window.createTableMapPage = function() {
    window.appPage = new TableMapPage();
}

// Creates an accounts list page
window.createAccountsListPage = function() {
    window.appPage = new AccountsListPage();
}

// Creates a single table page
window.createSingleTablePage = function() {
    window.appPage = new SingleTablePage();
}

// Creates a new account page
window.createNewAccountPage = function() {
    window.appPage = new NewAccountPage();
}

// Do stuff on window resize
$(window).resize(function() {
    onResize();
});

window.onResize = function() {}

//function to map a value from one range to another
function map(value, start1, stop1, start2, stop2)
{
    var slope = 1.0 * (stop2 - start2) / (stop1 - start1);
    return start2 + slope * (value - start1);
}
