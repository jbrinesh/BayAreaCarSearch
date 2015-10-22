(function(root) {
  'use strict';

  root.SearchButton = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    runSearch: function(e){
      e.preventDefault();
      QueryStore.run();
    },

    render: function(){
      return (
        <button
          className="search-button"
          onClick={this.runSearch}
          >Search
        </button>
      )
    }

  });
}(this));
