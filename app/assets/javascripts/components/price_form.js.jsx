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
        <form className="price-form clearfix" >
          <label>Price</label>
          <input
            type="text"
            id="min_price"
            placeholder="min"
            valueLink={this.linkState('min_price')}
          />

          <input
            type="text"
            id="max_price"
            placeholder="max"
            valueLink={this.linkState('max_price')}
          />
        </form>
      )

    }
  });
}(this));
