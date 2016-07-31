var React = require("react");
var YouTubePlayer = require("youtube-player");

var Player = React.createClass({
  propTypes: {
    videoId: React.PropTypes.string.isRequired,
    onProgress: React.PropTypes.func
  },

  getDefaultProps: function() {
    return ({onProgress: null});
  },

  getInitialState: function() {
    return ({player: null});
  },

  componentDidMount: function() {
    var player = YouTubePlayer("youtubePlayer");
    player.loadVideoById(this.props.videoId);
    player.on("ready", (event) => {this.setListeners(event)});
    this.setState({player: player});
  },

  setListeners: function(event) {
    var player = this.state.player;
    if (this.props.onProgress) {
      window.setInterval(this.propogateProgress, 1000);
    }
  },

  propogateProgress: function() {
    var player = this.state.player;
    player.getCurrentTime().then(time => {this.props.onProgress(time)});
  },

  render: function() {
    return (
      <div id = "youtubePlayer" />
    )
  }
});

module.exports = Player;
