(function(root) {
  'use strict';

  root.SearchButton = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    runSearch: function(e){
      e.preventDefault();
      QueryStore.run(100);
    },

    render: function(){
      return (
        <button
          className="search-button btn"
          onClick={this.runSearch}
          >Search
        </button>
      )
    }

  });
}(this));
