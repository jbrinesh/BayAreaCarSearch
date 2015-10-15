var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return(
      <div>
        <TitleBar/>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Search}/>
    <Route path="account" component={Account}/>
    <Route path="/:id" component={Show}/>
  </Route>
);

var mount_parent_component = function(){
  $(document).ready(function() {
    var root = document.getElementById('content');
    React.render(<Router>{routes}</Router>, root);
  });
};
