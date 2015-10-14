(function(root) {
  'use strict';

  root.SearchForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.search_params();

    },

    componentDidUpdate: function () {
      QueryActions.updateSearchParams(this.state);
    },

    render: function(){
      return (
        <form className="search_form" onChange={this.pushStore}>
          <label> Price(optional) </label> <br/>
          <label htmlFor="min_price"> From </label>
          <input type="text" id="min_price" valueLink={this.linkState('min_price')}/>
          <label htmlFor="max_price"> To </label>
          <input type="text" id="max_price" valueLink={this.linkState('max_price')}/>
          <br/>
          <br/>
          <label> Millage(optional) </label><br/>
          <label htmlFor="min_odometer"> From </label>
          <input type="text" id="min_odometer" valueLink={this.linkState('min_odometer')}/>
          <label htmlFor="max_odometer"> To </label>
          <input type="text" id="max_odometer" valueLink={this.linkState('max_odometer')}/>
        </form>
      )

    }
  });
}(this));
