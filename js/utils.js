function cbc(p, i, cb) {
    return function() {
        return cb(p, i);
    }
}

window.makePopup = function(text, onAgree) {
	$('body').prepend(`<div class="popup-overlay"></div>`);
	$('body').prepend(`
		<div class="popup ui-style-1">
			<div class="popup-top"><h4>${text}</h4></div>
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