(function(root) {
  'use strict';

  root.KeywordForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return QueryStore.keyword();
    },

    componentDidUpdate: function () {
      QueryActions.updateKeyword(this.state);
    },

    render: function(){
      return (
        <form className="keyword-form">
          <input type="text" id="keyword" valueLink={this.linkState('keyword')}/>
          <SearchButton/>
        </form>
      )

    }
  });
}(this));
