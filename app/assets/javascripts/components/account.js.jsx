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
          <AccountIndex clickHandler={this.clickHandler}/>
          <NewClassifiedForm/>
        </div>
      )
    }
  })
}(this));
