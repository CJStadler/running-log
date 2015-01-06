/** @jsx React.DOM */
// The logic for the workout writer

// Root component
var WorkoutApp = React.createClass({displayName: "WorkoutApp",
	render: function() {
		return React.createElement("div", null, TextForm, Intervals);
	}
});

var TextForm = React.createClass({displayName: "TextForm",
	render: function() {
		return React.createElement("p", null, "Hello");
	}
});

var Intervals = React.createClass({displayName: "Intervals",
	render: function() {
		return React.createElement("p", null, "World");
	}
});

React.render(<WorkoutApp />, document.getElementById("container"));