var React = require("react");
var Reflux =require("reflux");
var Player = require("./Player.jsx");
var QuestionPanel = require("./QuestionPanel.jsx");
var VideoActions = require("../reflux/VideoActions.jsx");
var VideoStore = require("../reflux/VideoStore.jsx");

var LectryManager = React.createClass({
  mixins: [Reflux.listenTo(VideoStore, "setVideoId")],

  propTypes: {
    assignmentId: React.PropTypes.string
  },

  getInitialState: function() {
    return ({time: 0, videoId: null});
  },

  handleProgress: function(time) {
    this.setState({time: time});
  },

  setVideoId: function(event, videoId) {
    this.setState({videoId: videoId});
  },

  componentWillMount: function() {
    VideoActions.postGetVideoId(this.props.assignmentId);
  },

  render: function() {
    return (
      <div className = "jumbotron row">
        {/* video */}
        <div className = "col-md-8">
          <h1> YouTube </h1>
          {this.state.videoId ? <Player videoId = {this.state.videoId} onProgress = {this.handleProgress} /> : null}
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
