var React = require("react");
var shortid = require("shortid");
var MultiQuestion = require("./MultiQuestion.jsx");

// Mock data.
var questions = [
  {
    type: "multiple choice",
    question: "What is a good example of a function?",
    qid: 1,
    answers: ["Only adding 1 + 1", "Returning 1 when called", "Adding some numbers 'a' and 'b'", "Functions are useless"],
    time: 43
  },
  {
    type: "multiple choice",
    question: "Test Question 2",
    qid: 2,
    answers: ["sol1", "sol2", "sol3", "sol4"],
    time: 20
  },
  {
    type: "multiple choice",
    question: "Test Question 3",
    qid: 3,
    answers: ["sol1", "sol2", "sol3", "sol4"],
    time: 2
  }
];

var QuestionPanel = React.createClass({
  PropTypes: {
    time: React.PropTypes.number
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

  componentWillMount: function() {
    // TODO: POST to server to get questions move to function listener.
    // Using mock data for now.
    questions.forEach(() => {this.questionKeys.push(shortid.generate())});
    this.setState({questions: questions});
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
