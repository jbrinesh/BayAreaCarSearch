(function(root) {
  'use strict';

  root.NewClassifiedButton = React.createClass({

    handleClick: function(e){
      e.preventDefault;
      window.location = "account/new";
    },

    render: function(){
      return (
        <button className="new-classified-button btn" onClick={this.props.clickHandler}>Post a Classified</button>
      )
    }
  })
}(this));
