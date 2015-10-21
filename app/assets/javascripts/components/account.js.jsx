(function(root) {
  'use strict';

  root.Account = React.createClass({

    mixins: [ReactRouter.History],

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._accountClassifiedsChanged);
    },

    _accountClassifiedsChanged: function (){
      this.props.history.pushState(null, "/account");
    },

    clickHandler: function(id){
      this.props.history.pushState(null, "/" + id);
    },

    newClickHandler: function(){
      this.props.history.pushState(null, "/account/new");
    },


    render: function(){
      return (
        <div className="account clearfix">
          <SignOutButton/>
          <NewClassifiedButton clickHandler={this.newClickHandler}/>
          <AccountIndex clickHandler={this.clickHandler}/>
        </div>
      )
    }
  })
}(this));
