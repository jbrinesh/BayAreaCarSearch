(function(root) {
  'use strict';
  root.GalleryIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function(e){
      var id = this.props.classified.id;
      this.props.clickHandler(id);
    },

    render: function(){
      var string = this.props.classified.title.slice(0,60) + " ---- $" + this.props.classified.price;
      var img_path;
      if (this.props.classified.images[0]){
        img_path = this.props.classified.images[0].img_path;
      } else {
        img_path = 'http://res.cloudinary.com/dfb4gjjt4/image/upload/c_scale,h_225,w_300/v1446749103/NoImageAvailable_prlpz5.jpg';
      }
      return (
        <li className="gallery-index-item clearfix" onClick={this.handleClick}>
          <div className="gallery-index-item-image-container">
            <img src={img_path} />
          </div>
          <div className="gallery-index-item-text-container">
            {string}
          </div>
        </li>
      )
    }
  })
}(this));
