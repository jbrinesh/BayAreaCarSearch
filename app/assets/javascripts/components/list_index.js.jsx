(function(root) {
  'use strict';

  root.ListIndex = React.createClass({

    getInitialState: function (){
      return {
        classifieds: ClassifiedStore.page(1),
        view: FilterStore.view(),
        sorting: FilterStore.sorting(),
        currentPage: 1,
        numOfPages: ClassifiedStore.numOfPages()
      };
    },

    componentDidMount: function(){
      ClassifiedStore.addChangeHandler(this._classifiedsChanged);
      FilterStore.addViewChangeHandler(this._updateView);
      FilterStore.addSortingChangeHandler(this._updateSorting);
      QueryStore.run();
    },

    componentWillUnmount: function(){
      ClassifiedStore.removeChangeHandler(this._classifiedsChanged);
      FilterStore.removeViewChangeHandler(this._updateView);
      FilterStore.removeSortingChangeHandler(this._updateSorting);
    },
    //
    // componentDidUpdate() {
    //   this.getDOMNode().scrollTop = 0;
    // },

    _classifiedsChanged: function (){
      this.setState({
        classifieds: ClassifiedStore.page(1),
        view: FilterStore.view(),
        sorting: FilterStore.sorting(),
        currentPage: 1,
        numOfPages: ClassifiedStore.numOfPages()
      });
      this.getDOMNode().scrollTop = 0;
    },

    _updateView: function(){
      this.setState({view: FilterStore.view()})
    },

    _updateSorting: function(){
      this.setState({
        sorting: FilterStore.sorting(),
        classifieds: ClassifiedStore.page(this.state.currentPage)
      })
    },

    _nextPage: function(){
      var currentPage = this.state.currentPage;
      if(currentPage < this.state.numOfPages){
        this.setState({
          classifieds: ClassifiedStore.page(currentPage + 1),
          currentPage: currentPage + 1
        })
      }
    },

    _prevPage: function(){
      var currentPage = this.state.currentPage;
      if(currentPage > 1){
        this.setState({
          classifieds: ClassifiedStore.page(currentPage - 1),
          currentPage: currentPage - 1
        })
      }
    },

    render: function (){
      return (
        <div className="list-index clearfix">
          <FilterBar/>
          <PageButtons
            handleNext={this._nextPage}
            handlePrev={this._prevPage}
            numOfPages={this.state.numOfPages}
            currentPage={this.state.currentPage}
          />
        {this.state.view === MapView ? <MapView clickHandler={this.props.clickHandler} currentPage={this.state.currentPage}/> :
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
