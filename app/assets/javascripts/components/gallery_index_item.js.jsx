(function(root) {
  'use strict';
  root.GalleryIndexItem = React.createClass({
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
        img_path = 'http://res.cloudinary.com/dfb4gjjt4/image/upload/v1445016807/no-image_zsxss7.jpg';
      }
      return (
        <li className="gallery-index-item" onClick={this.handleClick}>
          <img
            src={img_path}
            width="300"
            height="225"
          />
          {string}
        </li>
      )
    }
  })
}(this));
