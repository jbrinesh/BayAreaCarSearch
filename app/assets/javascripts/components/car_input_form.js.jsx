(function(root) {
  'use strict';

  root.CarForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        make: "",
        model: "",
        min_year: "",
        max_year: ""
      };
    },

    componentDidUpdate: function () {
      QueryActions.updateCarParams(this.state);
    },


    render: function(){
      return (
        <form className="car_form" onChange={this.pushStore}>
          <label htmlFor="make"> Make </label>
          <input type="text" id="make" valueLink={this.linkState('make')}/>
          <br/>
          <br/>
          <label htmlFor="model"> Model </label>
          <input type="text" id="model" valueLink={this.linkState('model')}/>
          <br/>
          <br/>
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
