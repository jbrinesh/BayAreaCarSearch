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
        <form className="search-form" >
          <label> Millage </label><br/>
          <label htmlFor="min_odometer"> From </label>
          <input type="text" id="min_odometer" valueLink={this.linkState('min_odometer')}/>
          <label htmlFor="max_odometer"> To </label>
          <input type="text" id="max_odometer" valueLink={this.linkState('max_odometer')}/>
        </form>
      )

    }
  });
}(this));
