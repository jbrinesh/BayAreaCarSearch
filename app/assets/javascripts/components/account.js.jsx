(function(root) {
  'use strict';

  root.Account = React.createClass({

    mixins: [ReactRouter.History],

    clickHandler: function(id){
      this.props.history.pushState(null, "/" + id);
    },

    render: function(){
      return (
        <div>
          <SignOutButton/>
          <h1>Account Page</h1>
          <AccountIndex clickHandler={this.clickHandler}/>
          <NewClassifiedForm/>
        </div>
      )
    }
  })
}(this));
