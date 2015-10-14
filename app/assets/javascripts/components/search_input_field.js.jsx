(function(root) {
  'use strict';

  root.SearchInputField = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    runSearch: function(e){
      var params = QueryStore.all();
      ApiUtil.fetch(params);
    },

    render: function(){
      return (
        <div className="search_input_field">
          <KeywordForm/>
          <br/>
          <br/>
          <CarForm/>
          <br/>
          <br/>
          <SearchForm/>
          <br/>
          <br/>
          <form onSubmit={this.runSearch}>
            <input type="submit" value="Search"/>
          </form>
        </div>

      )

    }

  });
}(this));
