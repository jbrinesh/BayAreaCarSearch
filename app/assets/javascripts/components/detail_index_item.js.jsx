(function(root) {
  'use strict';
  root.DetailIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function(e){
      var id = this.props.classified.id;
      this.props.clickHandler(id);
    },

    render: function(){
      var string = this.props.classified.title + " ---- $" + this.props.classified.price;
      var img_path;
      if (this.props.classified.images[0]){
        img_path = this.props.classified.images[0].img_path;
      } else {
        img_path = 'no-image_zsxss7.jpg';
      }
      return (
        <li className="detail-index-item" onClick={this.handleClick}>
          <img src={$.cloudinary.url( img_path, { width: 100, height: 60, crop: 'fill' })}></img>
          {string}
        </li>
      )
    }
  })
}(this));
