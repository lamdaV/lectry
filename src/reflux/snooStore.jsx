var http = require("../services/httpService.js");
var Reflux = require("reflux");
var SnooActions = require("./SnooActions.jsx");

var snooStore = Reflux.createStore({
  /*
    Listen to SnooActions.
  */
  listenables: [SnooActions],

  init: function() {
    this.posts = [];
    this.authentication = null;
  },

  /*
    Request the server to send get Listings.
  */
  postGetPosts: function(data) {
    var dataPack = {
      data: data
    };
    http.post("/getPosts", dataPack).then((dataJSON) => {
      var data = dataJSON.data;
      this.posts = data;
      this.returnStatus();
    });
  },

  postGetAuthentication: function() {
    http.post("/getAuthentication", {}).then((dataJSON) => {
      this.authentication = dataJSON;
      this.returnStatus();
    });
  },

  /*
    Send data to all listeners.
  */
  returnStatus: function() {
    this.trigger("change", this.authentication);
    this.authentication = null;
  }
});

module.exports = snooStore;
