(function(root) {
  'use strict';

  root.MapView = React.createClass({
    getInitialState: function(){
      return {markers: []}
    },

    componentDidMount: function (){
      var center = {lat: 37.780713,  lng: -122.412581};
      var mapOptions = {
        center: center,
        zoom: 13
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions)
      this.addMarkers(map);
      this.placeMarkers(map);
    },

    addMarkers: function (map){
      var that = this;
      this.props.classifieds.map(function(classified){
        if(classified.lat && classified.lng){
          var position = {lat: classified.lat, lng: classified.lng}
          var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: classified.title
          });
          var HtmlString = that.buildHtmlString(classified);
          var infoWindow = new google.maps.InfoWindow({
            content: HtmlString
          });


          marker.addListener('click', function (){
            that.props.clickHandler(classified.id);
          });

          marker.addListener('mouseover', function (){
            infoWindow.open(map, marker);
          });

          marker.addListener('mouseout', function (){
            infoWindow.close(map, marker);
          });
          this.setState({markers: this.state.markers.concat([marker])});
        }
      }.bind(this))
    },

    placeMarkers: function (map){
      this.state.markers.forEach(function(marker){
        marker.setMap(map);
      })
    },

    buildHtmlString: function(classified){
      if (classified.images[0] === undefined){
        var imgPath = 'no-image_zsxss7.jpg';
      } else {
        var imgPath = classified.images[0];
      }
      var imgUrl = $.cloudinary.url( imgPath, { width: 200, height: 120, crop: 'fill' });
      var string = classified.title + " ----$ " + classified.price;
      return (
        "<img src=" + imgUrl + "></img>" + "<br>" +
        "<h4>" + string + "</h4>"
      )
    },

    render: function(){
      return(
        <div id="map" className="map-view"></div>
      )
    }

  });
}(this));
