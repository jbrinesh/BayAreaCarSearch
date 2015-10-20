(function(root) {
  'use strict';

  root.Account = React.createClass({

    mixins: [ReactRouter.History],

    clickHandler: function(id){
      this.props.history.pushState(null, "/" + id);
    },

    newClickHandler: function(){
      this.props.history.pushState(null, "/account/new");
    },

    render: function(){
      return (
        <div className="account">
          <SignOutButton/>
          <NewClassifiedButton clickHandler={this.newClickHandler}/>
          <AccountIndex clickHandler={this.clickHandler}/>
        </div>
      )
    }
  })
}(this));
