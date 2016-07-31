var http = require("../services/httpService.js");
var Reflux = require("reflux");
var QuestionActions = require("./QuestionActions.jsx");

var QuestionStore = Reflux.createStore({
  /*
    Listen to QuestionActions.
  */
  listenables: [QuestionActions],

  init: function() {
    this.questions = null;
  },

  /*
    Request the server to send get Listings.
  */
  postGetQuestions: function(assignmentId) {
    var assignment = {
      assignmentId: assignmentId
    };
    http.post("/getQuestions", assignment).then((dataJSON) => {
      this.questions = dataJSON.questions;
      this.returnStatus();
    });
  },

  /*
    Send data to all listeners.
  */
  returnStatus: function() {
    this.trigger("change", this.questions);
    this.questions = null;
  }
});

module.exports = QuestionStore;
