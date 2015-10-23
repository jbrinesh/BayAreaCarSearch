(function(root) {
  'use strict';

  root.CarForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.carParams();
    },

    componentDidUpdate: function () {
      QueryActions.updateCarParams(this.state);
    },


    render: function(){
      return (
        <form className="car-form clearfix">
          <input
            type="text"
            id="make"
            placeholder="make"
            valueLink={this.linkState('make')}
          />

          <input
            type="text"
            id="model"
            placeholder="model"
            valueLink={this.linkState('model')}
          />

          <label> Year </label>
          <input
            type="text"
            id="min_year"
            placeholder="min"
            valueLink={this.linkState('min_year')}
          />

          <input
            type="text"
            id="max_year"
            placeholder="max"
            valueLink={this.linkState('max_year')}
          />

        </form>
      )

    }
  });
}(this));
