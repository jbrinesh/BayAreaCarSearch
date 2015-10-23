(function(root) {
  'use strict';

  root.LocationForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.locationParams();
    },

    componentDidUpdate: function () {
      QueryActions.updateLocationParams(this.state);
    },


    render: function(){
      return (
        <form className="location-form clearfix">
          <label> Location 
            <input
              type="text"
              id="address"
              placeholder="Address"
              valueLink={this.linkState('address')}
            />

            <input
              type="text"
              id="city"
              placeholder="City"
              valueLink={this.linkState('city')}
            />

            <input
              type="text"
              id="state"
              placeholder="State"
              valueLink={this.linkState('state')}
            />

            <input
              type="text"
              id="zip"
              placeholder="Zip Code"
              valueLink={this.linkState('zip')}
            />

            <input
              type="text"
              id="distance"
              placeholder="Within(miles)"
              valueLink={this.linkState('distance')}
            />
          </label>
        </form>
      )

    }
  });
}(this));
