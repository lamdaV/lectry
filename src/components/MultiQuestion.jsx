var React = require("react");
var shortid = require("shortid");

var MultiQuestion = React.createClass({
  propTypes: {
    question: React.PropTypes.string.isRequired,
    answers: React.PropTypes.array.isRequired,
    qid: React.PropTypes.number.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    var answers = this.props.answers.map(this.createAnswerRadio);
    return({selectedValue: null, answers: answers})
  },

  handleClick: function(event) {
    this.props.onUpdate(this.props.qid, event.target.value);
  },

  createAnswerRadio: function(item, index) {
    return (
      <div>
        <input onClick = {this.handleClick} key = {shortid.generate()} type = "radio" name = "answer" value = {item} /> {item} <br/>
      </div>
    );
  },

  render: function() {
    // Shuffle the questions?

    return (
      <div className = "panel panel-primary">
        <div className = "panel panel-heading">
          {this.props.question}
        </div>

        <div className = "panel panel-body">
          <form>
            {this.state.answers}
          </form>
        </div>
      </div>
    )
  }
});

module.exports = MultiQuestion;
