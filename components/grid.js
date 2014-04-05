/** @jsx React.DOM */

'use strict';

var Grid = React.createClass({
    render: function() {
        return (
            <div className="grid">
            	<Action title="Action 1" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Android-icon.png" />
            	<Action title="Action 2" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Baidu-icon.png" />
            	<Action title="Action 3" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Dzone-icon.png" />
            	<Action title="Action 4" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Formspring-icon.png" />
            	<Action title="Action 5" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Foursquare-icon.png" />
            	<Action title="Action 6" icon="http://icons.iconarchive.com/icons/designbolts/handstitch-social/128/Evernote-icon.png" />
            </div>
            );
    }
});