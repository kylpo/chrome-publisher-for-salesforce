chrome.contextMenus.create({
	title: "Share Link",
	contexts: ["link"],
	onclick: shareLink
});

chrome.contextMenus.create({
	title: "Share Image",
	contexts: ["image"],
	onclick: shareImage
});

function shareLink( info, tab ) {
	console.log("Sharing args: ", arguments);
	console.log("Sharing link: ", info.linkUrl);
	
	sendShareLink( tab.id, info.linkUrl );
}

function shareImage( info, tab ) {
	console.log("Sharing args: ", arguments);
	console.log("Sharing image: ", info.srcUrl);

	sendShareLink( tab.id, info.srcUrl );
}

function sendShareLink( tabId, url ) {
	chrome.tabs.sendMessage(tabId, {
		type: 'browserAction',
		action: 'FeedItem.LinkPost',
		data: {
			url: url
		}
	});
}