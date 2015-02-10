Chrome Publisher for Salesforce
=========================

![Chrome Publisher for Salesforce](/Chrome_Publisher.png?raw=true "Chrome Publisher")

### Perform Salesforce's Publisher Actions directly from Chrome! No need to be on a salesforce.com page.

[Chrome Publisher for Salesforce](https://chrome.google.com/webstore/detail/chrome-publisher-for-sale/iicjicoidokejlhbgdpbfphddeifhnjb) on the Chrome Web Store

*Currently in an ALPHA state since only Chatter actions are enabled. Also, a preview of personal actions (#TIL and #MyDay) made it in. Watch [this video](https://www.youtube.com/watch?v=yYF0jF6rVzg) for more details.*

This extension brings the power and convenience of Salesforce1's Publisher, right into the browser! No longer will you need to open a salesforce.com page, just to send a post/poll/link. 

While browsing the web, simply click the icon in the upper right of Chrome to get started.

**Note: this is NOT an official Salesforce project. Salesforce is not responsible for this extension.**

![Chrome Publisher Link](/Chrome_Publisher_Link.png?raw=true "Chrome Publisher Link")
![Chrome Publisher Options](/Chrome_Publisher_Options.png?raw=true "Chrome Publisher Options")

## Contributors
[Nick Ferraro](https://github.com/Spidy88) and [Kyle Poole](https://github.com/kylpo)

## Dev Notes
1. `npm install`
2. Create a `config.js` file in the root directory with:
  * `exports.clientId = "YOUR_CLIENT_ID";`
  * `exports.clientSecret = "YOUR_CLIENT_SECRET";`
  * `exports.host = "https://login.salesforce.com";`
3. `grunt`
4. Load unpacked extension in chrome://extensions/

### Notes for me
`npm install salesforce-api-using-access-token@latest --save`
