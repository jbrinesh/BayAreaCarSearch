(function(root) {
  'use strict';

  root.Account = React.createClass({

    mixins: [ReactRouter.History],

    clickHandler: function(id){
      this.props.history.pushState(null, "/" + id);
    },

    render: function(){
      return (
        <div className="account">
          <SignOutButton/>
          <AccountIndex clickHandler={this.clickHandler}/>
        </div>
      )
    }
  })
}(this));
