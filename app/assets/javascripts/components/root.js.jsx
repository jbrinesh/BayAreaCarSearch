(function(root) {
  'use strict';

  root.Root = React.createClass({

    render: function(){
      return (
        <div className="root">
          <SearchInputField/>
        </div>
      )
    }
  });
}(this));
