(function(root) {
  'use strict';

  root.KeywordForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function(){
      return {
        keyword: ""
      };
    },

    componentDidUpdate: function () {
      QueryActions.updateKeyword(this.state);
    },

    render: function(){
      return (
        <form className="keyword_form" onChange={this.pushStore}>
          <label htmlFor="keyword"> Keyword (optional)</label>
          <input type="text" id="keyword" valueLink={this.linkState('keyword')}/>
        </form>
      )

    }
  });
}(this));
