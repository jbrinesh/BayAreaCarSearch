(function(root) {
  'use strict';
  root.Show = React.createClass({
    render: function(){
      var classified = ClassifiedStore.find(this.props.params.id);
      return (
        <div>
          <h2>{classified.title}</h2>
        </div>
      )
    }
  })
}(this));