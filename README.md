QuickActionsForSalesforce
=========================

To generate bg bundle:
browserify js/background.js > background.built.js


Lessons learned:
- chrome.runtime.sendMessage can only pass a callback with 1 param. This means
  you can't employ the error-first (node) strategy.
- Maybe it is more appropriate to call out chrome.runtime.onMessage for only
  passing the 1 argument. Not sure which is to blame...
