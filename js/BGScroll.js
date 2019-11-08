var scrollSpeed = 10;
var currPos = 0;

function bgScroll()
{
    currPos--;
    $(".background-image").css("backgroundPosition", currPos+"px 0");
}

//scroll a pixel every 10 milliseconds
setInterval(bgScroll, scrollSpeed);