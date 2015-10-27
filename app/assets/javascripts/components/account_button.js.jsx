(function(root) {
  'use strict';

  root.AccountButton = React.createClass({

    handleClick: function(e){
      e.preventDefault;
      window.location = "/session/new";
    },

    render: function(){
      return (
        <button className="account-button btn" onClick={this.handleClick}>Account</button>
      )
    }
  })
}(this));
