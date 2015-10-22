(function(root) {
  'use strict';

  root.FilterBar = React.createClass({

    getInitialState: function (){
      return {
        view: FilterStore.view(),
        sorting: FilterStore.sorting()
      }
    },

    componentDidMount: function(){
      FilterStore.addViewChangeHandler(this._updateView)
      FilterStore.addSortingChangeHandler(this._updateSorting)
    },

    componentWillUnmount: function(){
      FilterStore.removeViewChangeHandler(this._updateView)
      FilterStore.removeSortingChangeHandler(this._updateSorting)
    },

    _updateView: function(){
      this.setState({view: FilterStore.view()})
    },

    _updateSorting: function(){
      this.setState({sorting: FilterStore.sorting()})
    },

    handleViewChange: function(e){
      FilterActions.updateView(window[e.target.value]);
    },

    handleSortingChange: function (e){
      FilterActions.updateSorting(e.target.value.split(", "));
    },

    render: function (){
      return (
        <div className="filter-bar">
          <form className="sort-form" onChange={this.handleSortingChange}>
            <label> Sort By:
              <select className="sort-selector">

                <option
                  value="price, DEC"
                  selected={
                    this.state.sorting[0] === "price" &&
                    this.state.sorting[1] ===  "DEC" ?
                    true : false
                  }
                  >Price: High to Low
                </option>

                <option
                  value="price, ACE"
                  selected={
                    this.state.sorting[0] === "price" &&
                    this.state.sorting[1] ===  "ACE" ?
                    true : false
                  }
                  >Price: Low to High
                </option>

                <option
                  value="odometer, DEC"
                  selected={
                    this.state.sorting[0] === "odometer" &&
                    this.state.sorting[1] ===  "DEC" ?
                    true : false
                  }
                  >Mileage: High to Low
                </option>

                <option
                  value="odometer, ACE"
                  selected={
                    this.state.sorting[0] === "odometer" &&
                    this.state.sorting[1] ===  "ACE" ?
                    true : false
                  }
                  >Mileage: Low to High
                </option>

              </select>
            </label>
          </form>
          <form className="view-form" onChange={this.handleViewChange}>

            <input
              name="views"
              type="radio"
              value="ListIndexItem"
              checked={this.state.view === ListIndexItem ? true : false}
              >List View
            </input>

            <input
              name="views"
              type="radio"
              value="DetailIndexItem"
              checked={this.state.view === DetailIndexItem ? true : false}
              >Details View
            </input>

            <input
              name="views"
              type="radio"
              value="GalleryIndexItem"
              checked={this.state.view === GalleryIndexItem ? true : false}
              >Gallery View
            </input>

            <input
              name="views"
              type="radio"
              value="MapView"
              checked={this.state.view === MapView ? true : false}
              >Map View
            </input>

          </form>
        </div>
      )
    }
  })

}(this));
