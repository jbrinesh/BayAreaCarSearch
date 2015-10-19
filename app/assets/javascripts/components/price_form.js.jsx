(function(root) {
  'use strict';

  root.PriceForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.priceParams();

    },

    componentDidUpdate: function () {
      QueryActions.updatePriceParams(this.state);
    },

    render: function(){
      return (
        <form className="search-form" >
          <label> Price </label> <br/>
          <label htmlFor="min_price"> From </label>
          <input type="text" id="min_price" valueLink={this.linkState('min_price')}/>
          <label htmlFor="max_price"> To </label>
          <input type="text" id="max_price" valueLink={this.linkState('max_price')}/>
        </form>
      )

    }
  });
}(this));
