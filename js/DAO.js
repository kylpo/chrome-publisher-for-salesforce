'use strict';

exports.getActions = function() {
    var items = [{
		"name" : "FeedItem.TextPost",
		"type" : "Post",
		"label" : "Post",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.LinkPost",
		"type" : "Post",
		"label" : "Link",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.ContentPost",
		"type" : "Post",
		"label" : "File",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.PollPost",
		"type" : "Post",
		"label" : "Poll",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
		}
	}, {
		"name" : "NewAccount",
		"type" : "Create",
		"label" : "New Account",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewAccount/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewAccount",
			"defaultValues" : "/services/data/v29.0/quickActions/NewAccount/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewAccount/describe"
		}
	}, {
		"name" : "NewCase",
		"type" : "Create",
		"label" : "New Case",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewCase/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewCase",
			"defaultValues" : "/services/data/v29.0/quickActions/NewCase/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewCase/describe"
		}
	}, {
		"name" : "NewContact",
		"type" : "Create",
		"label" : "New Contact",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewContact/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewContact",
			"defaultValues" : "/services/data/v29.0/quickActions/NewContact/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewContact/describe"
		}
	}, {
		"name" : "NewEvent",
		"type" : "Create",
		"label" : "New Event",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewEvent/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewEvent",
			"defaultValues" : "/services/data/v29.0/quickActions/NewEvent/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewEvent/describe"
		}
	}, {
		"name" : "NewLead",
		"type" : "Create",
		"label" : "New Lead",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewLead/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewLead",
			"defaultValues" : "/services/data/v29.0/quickActions/NewLead/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewLead/describe"
		}
	}, {
		"name" : "NewNote",
		"type" : "Create",
		"label" : "New Note",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewNote/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewNote",
			"defaultValues" : "/services/data/v29.0/quickActions/NewNote/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewNote/describe"
		}
	}, {
		"name" : "NewOpportunity",
		"type" : "Create",
		"label" : "New Opportunity",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewOpportunity/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewOpportunity",
			"defaultValues" : "/services/data/v29.0/quickActions/NewOpportunity/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewOpportunity/describe"
		}
	}, {
		"name" : "NewTask",
		"type" : "Create",
		"label" : "New Task",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/NewTask/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/NewTask",
			"defaultValues" : "/services/data/v29.0/quickActions/NewTask/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/NewTask/describe"
		}
	}, {
		"name" : "LogACall",
		"type" : "LogACall",
		"label" : "Log a Call",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
			"defaultValuesTemplate" : "/services/data/v29.0/quickActions/LogACall/defaultValues/{ID}",
			"quickAction" : "/services/data/v29.0/quickActions/LogACall",
			"defaultValues" : "/services/data/v29.0/quickActions/LogACall/defaultValues",
			"describe" : "/services/data/v29.0/quickActions/LogACall/describe"
		}
	}, {
		"name" : "FeedItem.MobileSmartActions",
		"type" : "Post",
		"label" : "Mobile Smart Actions",
		"icon" : "http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png",
		"urls" : {
		}
	}];
    return items;
}