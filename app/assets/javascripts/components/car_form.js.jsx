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
        <form className="car-form">
          <label htmlFor="make"> Make </label>
          <input type="text" id="make" valueLink={this.linkState('make')}/>
          <label htmlFor="model"> Model </label>
          <input type="text" id="model" valueLink={this.linkState('model')}/>
          <label> Year </label><br/>
          <label htmlFor="min_year"> From </label>
          <input type="text" id="min_year" valueLink={this.linkState('min_year')}/>
          <label htmlFor="max_year"> To </label>
          <input type="text" id="max_year" valueLink={this.linkState('max_year')}/>
        </form>
      )

    }
  });
}(this));
