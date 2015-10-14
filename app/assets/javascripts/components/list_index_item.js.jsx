(function(root) {
  'use strict';
  root.ListIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function(e){
      var id = this.props.classified.id;
      this.props.clickHandler(id);
    },

    render: function(){
      var string = this.props.classified.title + " ---- $" + this.props.classified.price;
      return (
        <li className="list_index_item"
            onClick={this.handleClick}
            >{string}</li>
      )
    }
  })
}(this));
