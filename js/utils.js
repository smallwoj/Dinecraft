function cbc(p, i, cb) {
    return function() {
        return cb(p, i);
    }
}

//function to map a value from one range to another
function map(value, start1, stop1, start2, stop2)
{
    var slope = 1.0 * (stop2 - start2) / (stop1 - start1);
    return start2 + slope * (value - start1);
}

window.makePopup = function(text, onAgree) {
	$('body').prepend(`<div class="popup-overlay"></div>`);
	$('body').prepend(`
		<div class="popup ui-style-1">
			<div class="popup-top" align="center"><h4>${text}</h4></div>
			<div class="popup-bottom">
				<div class="popup-no ui-style-1"><h4>No</h4></div>
				<div class="popup-yes ui-style-1"><h4>Yes</h4></div>
			</div>
		</div>
	`);

	$('.popup-overlay').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
	$('.popup-no').click(function(e) { $('.popup-overlay').remove(); $('.popup').remove(); });
	$('.popup-yes').click(function(e) { onAgree(); $('.popup-overlay').remove(); $('.popup').remove();});
}
