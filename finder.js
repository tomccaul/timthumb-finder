var button = chrome.contextMenus.create({"title": "Find timthumb original", "contexts": ["image"], "onclick": finder, "targetUrlPatterns":["*://*/*timthumb.php*"]});

function finder(info, tab) {
  var urlArray = info.srcUrl.match(/src=([^&]+)/);

  var src = decodeURIComponent(urlArray[1]);
  var target = '';

  // If the TimThumb src points to a absolute local file path, then try and convert it to a URL.
  if ( src.match(/^\//) ) {
  	var parts = src.match(/\/([^\/]+(\.[a-z]{3}|\.co\.uk))\/(httpdocs|public_html|htdocs)\/(.*)$/);
  	if ( parts && parts.length >= 2 ) {
  		hostname = parts[1];
  		path = parts[4];
  		target = 'http://' + hostname + '/' + path;
  	}
  } else {
  	target = src;
  }

  // Create new tab
  if ( target != '' ) {
  	chrome.tabs.create({'url': target}, function(tab) {});
  }
}