var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

$.cloudinary.config({ cloud_name: 'dfb4gjjt4', api_key: '298682488138135'});

var App = React.createClass({

  componentDidMount: function(){
    QueryStore.run();
  },

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
      <Route path="account/new" component={NewClassifiedForm}/>
    <Route path=":id" component={Show}/>
  </Route>
);

var mount_parent_component = function(){
  $(document).ready(function() {
    var root = document.getElementById('content');
    React.render(<Router>{routes}</Router>, root);
  });
};
