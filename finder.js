var button = chrome.contextMenus.create({"title": "Find timthumb original", "contexts": ["image"], "onclick": finder});

function finder(info, tab) {
  var myRe = /src=([^&]+)/g;  
  var urlArray = myRe.exec(info.srcUrl);

  // Create new tab
  chrome.tabs.create({'url': decodeURIComponent(urlArray[1])}, function(tab) {});
}