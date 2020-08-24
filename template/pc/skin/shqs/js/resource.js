$(document).ready(function() {
	var pageurl = window.location.href;
	var urlsource = "";
	if(pageurl.indexOf("cl_sr") != -1) {
		var arrs = pageurl.split("cl_sr");
		var urlsource = arrs[1];
		if(urlsource.indexOf("#") != -1) {
			var arrs2 = urlsource.split("#");
			urlsource = arrs2[0];
		}
		urlsource = '?cl_sr' + urlsource;
	}

	$('a').each(function() {
		var href = $(this).attr('href');
		if(href != null && href != "") {
			if(urlsource != "") {
				if(href.indexOf("#") != -1 && href.indexOf("#") != 0) {
					var herfarrs = href.split("#");
					var herf1 = herfarrs[0];
					var herf2 = herfarrs[1];
					var Ahref = herf1 + urlsource + "#" + herf2;
					$(this).attr("href", Ahref);
				}
				if(href.indexOf("#") == -1) {
					var Ahref = href + urlsource;
					$(this).attr("href", Ahref);
				}

			}
		}

	});

});