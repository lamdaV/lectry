var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var CreateHistory = require("history").createHashHistory;
var useRouterHistory = ReactRouter.useRouterHistory;

var Base = require("./components/Base.jsx");
var PageTemplate = require("./components/PageTemplate.jsx");
var LectryPage = require("./components/LectryPage.jsx");

var History = useRouterHistory(CreateHistory)({
  queryKey: false
});

var Routes = (
  <Router history = {History}>
    <Route path = "/" component = {Base}>
      <IndexRoute component = {LectryPage}></IndexRoute>
      <Route path = "/assignment/:assignmentId" component = {LectryPage}></Route>
    </Route>
  </Router>
);

module.exports = Routes;
