(function(root) {
  'use strict';
  root.AccountIndex = React.createClass({

    getInitialState: function (){
      return { account_classifieds: ClassifiedStore.account_all() }
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._accountClassifiedsChanged);
      AccountUtil.fetch();
    },

    _accountClassifiedsChanged: function(){
      this.setState({ account_classifieds: ClassifiedStore.account_all() })
    },

    render: function (){
      return (
        <ul className="account-index">
          {
            this.state.account_classifieds.map(function(classified){
              return <ListIndexItem
                      key={classified.id}
                      classified={classified}
                      clickHandler={this.props.clickHandler}/>
            }.bind(this))
          }
        </ul>
      )
    }
  })
}(this));
