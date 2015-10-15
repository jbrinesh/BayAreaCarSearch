(function(root) {
  'use strict';

  root.SignOutButton = React.createClass({

    handleClick: function(e){
      e.preventDefault;
      AccountUtil.signOut();
    },

    render: function(){
      return (
        <button className="sign-out-button" onClick={this.handleClick}>Sign Out</button>
      )
    }
  })
}(this));
