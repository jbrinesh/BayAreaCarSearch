(function(root) {
  'use strict';
  root.AccountIndex = React.createClass({

    getInitialState: function (){
      return {
        account_classifieds: ClassifiedStore.account_all(),
        view: FilterStore.view(),
        sorting: FilterStore.sorting()
      };
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._accountClassifiedsChanged);
      FilterStore.addViewChangeHandler(this._updateView)
      FilterStore.addSortingChangeHandler(this._updateSorting)
      AccountUtil.fetch();
    },

    componentWillUnmount: function(){
      ClassifiedStore.removeChangeHandler(this._accountClassifiedsChanged);
      FilterStore.removeSortingChangeHandler(this._updateSorting);
      FilterStore.removeViewChangeHandler(this._updateView);
    },

    _accountClassifiedsChanged: function(){
      this.setState({ account_classifieds: ClassifiedStore.account_all() })
    },

    _updateView: function(){
      this.setState({ view: FilterStore.view() })
    },

    _updateSorting: function(){
      this.setState({sorting: FilterStore.sorting()})
    },

    _sort: function(classifieds){
      return classifieds.sort(this._comparitor(FilterStore.sorting()))
    },


    _comparitor: function(sorting){
     return (function(a, b){
        if(a[sorting[0]] < b[sorting[0]]){
          return (sorting[1] === "DEC" ? 1 : -1);
        } else if(a[sorting[0]] > b[sorting[0]]){
          return (sorting[1] === "DEC" ? -1 : 1);
        } else {
          return 0;
        }
      });
    },

    render: function (){
      return (
        <div className="account-index clearfix">
          <FilterBar/>
          {this.state.view === MapView ? <MapView clickHandler={this.props.clickHandler} classifieds={this.state.account_classifieds}/> :
          <ul>
            {
              this._sort(this.state.account_classifieds).map(function(classified){
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
