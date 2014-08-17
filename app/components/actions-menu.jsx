/** @jsx React.DOM */

'use strict';

var React = require("react/addons");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            "isHidden": true
        };
    },
    launchPanel: function() {
        chrome.windows.create({
            "url": "popup.html",
            "type": "panel",
//            "type": "popup",
            "width": 320,
            "height": 521
        });
        window.close();
    },
    refreshActions: function() {
        chrome.runtime.sendMessage({type: "refreshActions"}, function(response) {
            if (response === null) {
                console.error("Error refreshing actions to client");
            } else {
                window.location.reload();
            }
        });
    },
    logout: function() {
        chrome.runtime.sendMessage({type: "logout"}, function() {
//            if (response === null) {
//                console.error("Error re-authorizing");
//            } else {
//                window.location.reload();
//            }
        });
    },
    openMenu: function() {
        this.setState({"isHidden": !this.state.isHidden})
    },
    render: function() {
        var cx = React.addons.classSet;
        var menuClasses = cx({
            "ActionsMenu-dropdownMenu": true,
            'is-hidden': this.state.isHidden
        });
        var buttonClasses = cx({
            "ActionsMenu-button": true,
            'is-active': !this.state.isHidden
        });
        var buttonIcon = chrome.extension.getURL("build/icons/menu-dots.png");

        return (
            <div className="ActionsMenu">
                <img className={buttonClasses} src={buttonIcon} onClick={this.openMenu}/>
                <ul className={menuClasses}>
                    <li className="ActionsMenu-dropdownItem" onClick={this.launchPanel}><span className="icon-utility-share"/>  Popout</li>
                    <li className="ActionsMenu-dropdownItem" onClick={this.refreshActions}><span className="icon-utility-refresh"/>  Refresh</li>
                    <li className="ActionsMenu-dropdownItem" onClick={this.logout}><span className="icon-utility-logout"/>  Logout</li>
                </ul>
            </div>
        );
    }
});
