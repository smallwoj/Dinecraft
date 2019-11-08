// Function to check if the current window layout is in landscape.
// Returns: true if the window is landscape, false if in portrait
window.isLandscape = function() {
    return $(window).width() >= $(window).height();
};

// Once the page is loaded, do stuff. Fired only once
$(document).ready(function() {
    window.DB.createFakeData();

    $('.dropdown-field').click(() => {
        $('.dropdown-pane').show();
    });

    $('.dropdown-pane .dropdown-item').click(() => {
         $('.dropdown-pane').hide();       
    });
});

// Do stuff on window resize
$(window).resize(function() {

    console.log(window.isLandscape());
});
