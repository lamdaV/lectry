var React = require("react");
var Reflux =require("reflux");
var shortid = require("shortid");
var MultiQuestion = require("./MultiQuestion.jsx");
var QuestionActions = require("../reflux/QuestionActions.jsx");
var QuestionStore = require("../reflux/QuestionStore.jsx");

var QuestionPanel = React.createClass({
  mixins: [Reflux.listenTo(QuestionStore, "setQuestions")],

  propTypes: {
    time: React.PropTypes.number,
    assignmentId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    this.questionKeys = [];
    this.submission = {};
    return({questions: null, currentTime: 0, results: {}});
  },

  createQuestion: function(item, index) {
    if (item.time > this.state.currentTime) {
      return null;
    }

    switch (item.type) {
      case "multiple choice":
        return <MultiQuestion key = {this.questionKeys[index]} onUpdate = {this.getUpdate} qid = {item.qid} question = {item.question} answers = {item.answers} />
      break;

      default:
        console.log("invalid question type");
        return null;
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    // TODO: Push to server. (this.submission)
    console.log("submitting");
  },

  getUpdate: function(qid, value) {
    this.submission[qid] = value;
  },

  setQuestions: function(event, questions) {
    console.log("QuestionPanel: " + questions);
    this.setState({questions: questions});
  },

  componentWillMount: function() {
    // TODO: POST to server to get questions move to function listener.
    // Using mock data for now.
    // questions.forEach(() => {this.questionKeys.push(shortid.generate())});
    // this.setState({questions: questions});
    QuestionActions.postGetQuestions(this.props.assignmentId);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({currentTime: nextProps.time});
  },

  render: function() {
    var panelStyle = {
      minHeight: 362,
      maxHeight: 362,
      background: "#696969"
    };

    var panelBodyStyle = {
      minHeight: 285,
      maxHeight: 285,
      background: "#696969",
      overflow: "auto"
    };

    var panelFooterStyle = {
      minHeight: 54,
      maxHeight: 54,
      background: "#336699",
      border: 0
    };

    return (
      <div className = "panel panel-primary" style = {panelStyle}>
        {/* Questions  */}
        <div className = "panel panel-body" style = {panelBodyStyle}>
          {this.state.questions ? this.state.questions.map(this.createQuestion) : null}
        </div>

        {/* Submit Answers */}
        <div className = "panel panel-footer" style = {panelFooterStyle}>
          <form onSubmit = {this.handleSubmit}>
            {/* Submit button */}
            <button className = "btn btn-success btn-block" type = "button" onClick = {this.handleSubmit}>
              Submit
            </button>
          </form>
        </div>

      </div>
    )
  }
});

module.exports = QuestionPanel;
