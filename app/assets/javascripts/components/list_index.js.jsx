(function(root) {
  'use strict';

  root.ListIndex = React.createClass({

    getInitialState: function (){
      return {
        classifieds: ClassifiedStore.all(),
        view: ListIndexItem
      };
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._classifiedsChanged)
      QueryStore.run();
    },

    componentWillUnmount: function(){
      ClassifiedStore.removeChangeHandler(this._classifiedsChanged)
    },

    _classifiedsChanged: function (){
      this.setState({classifieds: ClassifiedStore.all()});
    },

    _handleSortChange: function(e){
      var sortParams = e.target.value.split(", ");
      this.setState({
        classifieds: ClassifiedStore.all().sort(this._comparitor(sortParams[0], sortParams[1]))
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
        <div className="list-index clearfix">
          <FilterBar selected={this.state.view} handleSortChange={this._handleSortChange} handleViewChange={this._handleViewChange}/>
          {this.state.view === MapView ? <MapView clickHandler={this.props.clickHandler} classifieds={this.state.classifieds}/> :
          <ul>
            {
              this.state.classifieds.map(function(classified){
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
