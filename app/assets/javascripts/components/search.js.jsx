(function(root) {
  'use strict';

  root.Search = React.createClass({
    mixins: [ReactRouter.History],

    clickHandler: function(id){
      this.props.history.pushState(null, "/" + id);
    },

    render: function(){
      return (
        <div className="search">
          <AccountButton/>
          <SearchInputField/>
          <KeywordForm/>
          <ListIndex clickHandler={this.clickHandler}/>
        </div>
      )
    }
  });
}(this));
