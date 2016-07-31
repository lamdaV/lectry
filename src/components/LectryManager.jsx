var React = require("react");
var Player = require("./Player.jsx");
var QuestionPanel = require("./QuestionPanel.jsx");

var LectryManager = React.createClass({
  propTypes: {
    assignmentId: React.PropTypes.string
  },

  getInitialState: function() {
    return ({time: 0});
  },

  handleProgress: function(time) {
    this.setState({time: time});
  },

  render: function() {
    return (
      <div className = "jumbotron row">
        {/* video */}
        <div className = "col-md-8">
          <h1> YouTube </h1>
          <Player videoId = "qO4ZN5uZSVg" onProgress = {this.handleProgress} />
        </div>

        {/* questions */}
        <div className = "col-md-4">
          <h1> Questions </h1>
          <QuestionPanel time = {this.state.time} assignmentId = {this.props.assignmentId} />
        </div>
      </div>

    );
  }
});

module.exports = LectryManager;
