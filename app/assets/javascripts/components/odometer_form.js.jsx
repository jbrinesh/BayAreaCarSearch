(function(root) {
  'use strict';

  root.OdometerForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.odometerParams();

    },

    componentDidUpdate: function () {
      QueryActions.updateOdometerParams(this.state);
    },

    render: function(){
      return (
        <form className="odometer-form clearfix" >
          <label> Mileage</label>
          <input
            type="text"
            id="min_odometer"
            placeholder="min"
            valueLink={this.linkState('min_odometer')}
          />

          <input
            type="text"
            id="max_odometer"
            placeholder="max"
            valueLink={this.linkState('max_odometer')}
          />
        </form>
      )

    }
  });
}(this));
