(function(root) {
  'use strict';

  root.TitleBar = React.createClass({
    goHome: function (){
      window.location = "/";
    },
    render: function() {
      return (
        <div className="title_bar">
          <header onClick={this.goHome}><h1>Bay Area Car Search</h1></header>
        </div>
      )
    }
  })
}(this));
