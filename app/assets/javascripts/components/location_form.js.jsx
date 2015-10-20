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
        <form className="location-form">
          <label htmlFor="address"> Address </label>
          <input type="text" id="address" valueLink={this.linkState('address')}/>
          <label htmlFor="city"> City </label>
          <input type="text" id="city" valueLink={this.linkState('city')}/>
          <label htmlFor="state"> State </label>
          <input type="text" id="state" valueLink={this.linkState('state')}/>
          <label htmlFor="zip"> Zip Code </label>
          <input type="text" id="zip" valueLink={this.linkState('zip')}/>
          <label htmlFor="distance"> Within </label>
          <input type="text" id="zip" valueLink={this.linkState('distance')}/>
        </form>
      )

    }
  });
}(this));
