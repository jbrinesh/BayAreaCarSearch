(function(root) {
  'use strict';

  root.FilterBar = React.createClass({

    render: function (){
      return (
        <div className="filter-bar">
          <form className="sort-form" onChange={this.props.handleSortChange}>
            <label> Sort By:
              <select className="sort-selector">
                <option value=""></option>
                <option value="price, DEC">Price: High to Low</option>
                <option value="price, ACE">Price: Low to High</option>
                <option value="odometer, DEC">Mileage: High to Low</option>
                <option value="odometer, ACE">Mileage: Low to High</option>
              </select>
            </label>
          </form>
          <form className="view-form" onChange={this.props.handleViewChange}>
            <input name="views"
                   type="radio"
                   value="ListIndexItem"
                   checked={this.props.selected === ListIndexItem ? true : false}>
                   List View
            </input>
            <input name="views" type="radio" value="DetailIndexItem">Details View</input>
            <input name="views" type="radio" value="GalleryIndexItem">Gallery View</input>
            <input name="views" type="radio" value="MapView">Map View</input>
          </form>
        </div>
      )
    }
  })

}(this));
