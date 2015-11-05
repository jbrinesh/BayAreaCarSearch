(function(root) {
  'use strict';

  root.ImageDisplay = React.createClass({

    getInitialState: function(){
      var default_img_path;
      if (this.props.classified.images[0] === undefined){
        default_img_path = 'http://res.cloudinary.com/dfb4gjjt4/image/upload/c_scale,h_450,w_600/v1446749103/NoImageAvailable_prlpz5.jpg';
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
        var images = [{img_path: 'http://res.cloudinary.com/dfb4gjjt4/image/upload/c_scale,h_450,w_600/v1446749103/NoImageAvailable_prlpz5.jpg'}];
      } else {
        var images = this.props.classified.images.slice(0,9);
      }
      return (
        <div className="image-display clearfix">
          <div className="image-main-container">
            <img src={this.state.currentImgPath}/>
          </div>
        <ul className="image-thumbs clearfix">
            {
              images.map(function(image, idx){
                return (
                  <div className="image-thumb-container">
                    <img
                      key={idx}
                      id={image.img_path}
                      src={image.img_path}
                      onClick={this.handleClick}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseLeave={this.handleMouseLeave}
                    />
                  </div>

                )
              }.bind(this))
            }
          </ul>
        </div>
      )
    }
  })
}(this));
