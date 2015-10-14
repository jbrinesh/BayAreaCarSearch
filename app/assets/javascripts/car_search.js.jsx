var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return(
      <div>
        <header><h1>Bay Area Car Search</h1></header>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Search}/>
      <Route path="/:id" component={Show}/>
  </Route>
);

$(document).ready(function() {
  var root = document.getElementById('content');
  React.render(<Router>{routes}</Router>, root);
});
