(function(root) {
  'use strict';

  root.TitleBar = React.createClass({
    goHome: function (){
      window.location = "/";
    },
    render: function() {
      return (
        <div className="title-bar">
          <img onClick={this.goHome} src="http://res.cloudinary.com/dfb4gjjt4/image/upload/v1445911695/LOGO_BACS_yumqng.png"/>
        </div>
      )
    }
  })
}(this));
