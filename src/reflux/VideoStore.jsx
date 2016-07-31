var http = require("../services/httpService.js");
var Reflux = require("reflux");
var VideoActions = require("./VideoActions.jsx");

var VideoStore = Reflux.createStore({
  /*
    Listen to VideoActions.
  */
  listenables: [VideoActions],

  init: function() {
    this.videoId = null;
  },

  /*
    Request the server for videoId given assignmentId
  */
  postGetVideoId: function(assignmentId) {
    var assignment = {
      assignmentId: assignmentId
    };
    http.post("/getVideoId", assignment).then((dataJSON) => {
      this.videoId = dataJSON.videoId;
      console.log("videoId: " + this.videoId);
      this.returnStatus();
    });
  },

  /*
    Send data to all listeners.
  */
  returnStatus: function() {
    this.trigger("change", this.videoId);
    this.videoId = null;
  }
});

module.exports = VideoStore;
