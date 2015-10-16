(function(root) {
  'use strict';

  root.ImageDisplay = React.createClass({

    render: function (){
      var img_ref;
      if (this.props.classified.img_ref){
        img_ref = this.props.classified.img_ref;
      } else {
        img_ref = 'no-image_zsxss7.jpg';
      }
      return (
          <img src={$.cloudinary.url( img_ref, { width: 500, height: 300, crop: 'fill' })} />
      )
    }
  })
}(this));
