function getRandomLink(chars) {
	var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var link = '';
	for(var i = 0; i < chars; i++) {
		link += c.charAt(Math.floor(Math.random() * c.length));
	}
	return link;
}

function displayRandomImage() {
	$("#image").html("");
	$("#loader").show();
	var chars = 4;
	var random = getRandomLink(chars);
	var img = $("<img>").attr({
		'id': 'imgMain',
		'src': 'http://puu.sh/6' + random,
		'class': 'ri'
	});
	img.load(function() {
		if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth ==0) {
			displayRandomImage(); // Try to show another image
		} else {
			var str = 'I thought this random image I found was worth sharing: http://puu.sh/6' + random + ' #random';
			var encoded = encodeURIComponent(str);
			$('#directLink').attr('title', 'Click to Copy').tooltip('fixTitle').tooltip('hide');
			$("#image").html(img);
			$('#twitterShare').attr('onClick', "window.open('https://twitter.com/intent/tweet?text=" + encoded +"')");
			$("#loader").hide();
			$('#directLink').clipboard({
			    path: 'assets/flash/jquery.clipboard.swf',
			    copy: function() {
			    	$('#directLink').attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
			    	return $('#imgMain').attr('src');
			    }

			});
			foundImage = true;
		}
	});
	img.error(function() {
		displayRandomImage(); // Try to show another image
	});
	$('#directLink').tooltip();
	$('#twitterShare').tooltip();
}

$(function() {
	displayRandomImage();
});