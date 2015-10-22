(function(root) {
  'use strict';

  root.SearchInputField = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    // runSearch: function(e){
    //   e.preventDefault();
    //   QueryStore.run();
    // },

    render: function(){
      return (
        <div className="search-input-field">
          <CarForm/>
          <PriceForm/>
          <OdometerForm/>
          <LocationForm/>
        </div>

      )

    }

  });
}(this));
