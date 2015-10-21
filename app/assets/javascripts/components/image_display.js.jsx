(function(root) {
  'use strict';

  root.ImageDisplay = React.createClass({

    getInitialState: function(){
      var default_img_path;
      if (this.props.classified.images[0] === undefined){
        default_img_path = 'no-image_zsxss7.jpg';
      } else {
        default_img_path = this.props.classified.images[0].img_path;
      }
      return {
        currentImgPath: default_img_path,
        clickedImgPath: default_img_path
        }
    },

    handleClick: function(e){
      this.setState({
        currentImgPath: e.target.id,
        clickedImgPath: e.target.id
      })
    },

    handleMouseEnter: function(e){
      this.setState({
        currentImgPath: e.target.id
      })
    },

    handleMouseLeave: function(e){
      this.setState({
        currentImgPath: this.state.clickedImgPath
      })
    },

    render: function (){
      if(this.props.classified.images[0] === undefined ){
        var images = [{img_path: 'no-image_zsxss7.jpg'}];
      } else {
        var images = this.props.classified.images;
      }
      return (
        <div className="image-display">
          <img src={$.cloudinary.url( this.state.currentImgPath, { width: 500, height: 300, crop: 'fill' })} />
          <ul>
            {
              images.map(function(image, idx){
                return <img key={idx}
                        id={image.img_path}
                        src={$.cloudinary.url( image.img_path, { width: 100, height: 60, crop: 'fill' })}
                        onClick={this.handleClick}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        />
                    }.bind(this))
            }
          </ul>
        </div>
      )
    }
  })
}(this));
