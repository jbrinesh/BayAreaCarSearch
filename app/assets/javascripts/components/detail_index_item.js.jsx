(function(root) {
  'use strict';
  root.DetailIndexItem = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function(e){
      var id = this.props.classified.id;
      this.props.clickHandler(id);
    },

    render: function(){
      var img_path;
      if (this.props.classified.images[0]){
        img_path = this.props.classified.images[0].img_path;
      } else {
        img_path = 'http://res.cloudinary.com/dfb4gjjt4/image/upload/v1445016807/no-image_zsxss7.jpg';
      }
      return (
        <li className="detail-index-item" onClick={this.handleClick}>
          <div className="detail-index-item-image-container">
            <img src={img_path} />
          </div>
          <table className="detail-index-item-details">
            <tr>
              <td>{this.props.classified.title}</td>
              <td>{this.props.classified.odometer + " miles"}</td>
              <td>{this.props.classified.address}</td>
              <td>{"$" + this.props.classified.price}</td>
            </tr>
          </table>
        </li>
      )
    }
  })
}(this));
