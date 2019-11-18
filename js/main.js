// Function to check if the current window layout is in landscape.
// Returns: true if the window is landscape, false if in portrait
window.isLandscape = function() {
    return $(window).width() >= $(window).height();
};

// Once the page is loaded, do stuff. Fired only once
$(document).ready(function() {
    window.DB.createFakeData();

    // Start with a login page
    window.createLoginPage();

    // DEBUG: start with a table map page
//    window.auth = window.DB.accounts[0];
//    window.createTableMapPage();

    // Fire on resize to scale the generated page
    onResize();
});

// Creates a log in page
window.createLoginPage = function() {
    window.loginPage = new LoginPage();
}

// Creates a table map page
window.createTableMapPage = function() {
    window.tableMapPage = new TableMapPage();
}

// Creates an ordering page
window.createOrderingPage = function() {
    window.orderingPage = new OrderingPage();
}

// Do stuff on window resize
$(window).resize(function() {
    onResize();
});

window.onResize = function() {}

