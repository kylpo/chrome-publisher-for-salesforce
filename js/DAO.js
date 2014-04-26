'use strict';

exports.getActions = function() {
    var items = [{
		"name" : "FeedItem.TextPost",
		"type" : "Post",
		"label" : "Post",
		"icon" : "icons/post_120.png",
		"iconColor" : "#4eb1cb",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.LinkPost",
		"type" : "Post",
		"label" : "Link",
		"icon" : "icons/link_120.png",
		"iconColor" : "#6078c2",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.ContentPost",
		"type" : "Post",
		"label" : "File",
		"icon" : "icons/file_120.png",
		"iconColor" : "#b19f7e",
		"urls" : {
		}
	}, {
		"name" : "FeedItem.PollPost",
		"type" : "Post",
		"label" : "Poll",
		"icon" : "icons/poll_120.png",
		"iconColor" : "#5181c4",
		"urls" : {
		}
	}, {
		"name" : "NewAccount",
		"type" : "Create",
		"label" : "New Account",
		"icon" : "icons/account_120.png",
		"iconColor" : "#717ecd",
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
		"icon" : "icons/case_comment_120.png",
		"iconColor" : "#eac95a",
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
		"icon" : "icons/contact_120.png",
		"iconColor" : "#8b7fd5",
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
		"icon" : "icons/event_120.png",
		"iconColor" : "#d96383",
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
		"icon" : "icons/lead_120.png",
		"iconColor" : "#ed7e58",
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
		"icon" : "icons/note_120.png",
		"iconColor" : "#dcd861",
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
		"icon" : "icons/opportunity_120.png",
		"iconColor" : "#f3ae4e",
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
		"icon" : "icons/task_120.png",
		"iconColor" : "#4ab471",
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
		"icon" : "icons/case_log_a_call_120.png",
		"iconColor" : "#eac95a",
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
		"icon" : "icons/default_120.png",
		"iconColor" : "#849cb1",
		"urls" : {
		}
	}];
    return items;
}