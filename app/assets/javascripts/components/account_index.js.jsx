(function(root) {
  'use strict';
  root.AccountIndex = React.createClass({

    getInitialState: function (){
      return {
        account_classifieds: ClassifiedStore.account_all(),
        view: ListIndexItem
      };
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._accountClassifiedsChanged);
      AccountUtil.fetch();
    },

    componentWillUnmount: function(){
      ClassifiedStore.removeChangeHandler(this._accountClassifiedsChanged);
    },

    _accountClassifiedsChanged: function(){

      this.setState({ account_classifieds: ClassifiedStore.account_all() })
    },

    _handleSortChange: function(e){
      var sortParams = e.target.value.split(", ");
      this.setState({
        account_classifieds: ClassifiedStore.account_all().sort(this._comparitor(sortParams[0], sortParams[1]))
      })
    },

    _handleViewChange: function(e){
      this.setState({ view: window[e.target.value] })
    },

    _comparitor: function(attr, order){
     return (function(a, b){
        if(a[attr] < b[attr]){
          return (order === "DEC" ? 1 : -1);
        } else if(a[attr] > b[attr]){
          return (order === "DEC" ? -1 : 1);
        } else {
          return 0;
        }
      });
    },

    render: function (){
      return (
        <div className="account-index clearfix">
          <FilterBar handleSortChange={this._handleSortChange} handleViewChange={this._handleViewChange}/>
          {this.state.view === MapView ? <MapView classifieds={this.state.account_classifieds}/> :
          <ul>
            {
              this.state.account_classifieds.map(function(classified){
                return React.createElement(this.state.view,
                        {key: classified.id,
                        classified: classified,
                        clickHandler: this.props.clickHandler});
              }.bind(this))
            }
          </ul>
        }
        </div>
      )
    }
  })
}(this));
