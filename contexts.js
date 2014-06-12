chrome.contextMenus.create({
	title: "Share Link",
	contexts: ["link"],
	onclick: function() {
		console.log("Launching Salesforce Quick Actions");
	}
}, function() {
	console.log("'Share Link' context menu item for Salesforce Quick Actions created");
});

chrome.contextMenus.create({
	title: "Share Image",
	contexts: ["image"],
	onclick: function() {
		console.log("Launching Salesforce Quick Actions");
	}
}, function() {
	console.log("'Share Image' context menu item for Salesforce Quick Actions created");
});

chrome.contextMenus.create({
	title: "Share Video",
	contexts: ["video"],
	onclick: function() {
		console.log("Launching Salesforce Quick Actions");
	}
}, function() {
	console.log("'Share Video' context menu item for Salesforce Quick Actions created");
});