var React = require("react");
var LectryManager = require("./LectryManager.jsx");

var LectryPage = React.createClass({
  propTypes: {
    params: React.PropTypes.object
  },

  getInitialState: function() {
    return ({assignmentId: null});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({assignmentId: nextProps.params.assignmentId});
  },

  render: function() {
    return (
      <div>
        <LectryManager assignmentId = {this.state.assignmentId} />
      </div>
    );
  }
});

module.exports = LectryPage;
