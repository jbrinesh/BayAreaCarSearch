(function(root) {
  'use strict';

  root.MapView = React.createClass({
    getInitialState: function(){
      return {
        classifieds: []
      }
    },

    componentDidMount: function (){
      ClassifiedStore.addChangeHandler(this._resetClassifieds);
      this.setState({classifieds: ClassifiedStore.all()})
    },

    componentWillUnmount: function (){
      ClassifiedStore.removeChangeHandler(this._resetClassifieds)
    },

    componentDidUpdate: function(){
      var center = {lat: 37.780713,  lng: -122.412581};
      var mapOptions = {
        center: center,
        zoom: 10
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions)
      var markers = this.addMarkers(map);
      this.placeMarkers(map, markers);
    },

    _resetClassifieds: function (){
      this.setState({
        classifieds: ClassifiedStore.all()
      })
    },

    addMarkers: function (map){
      var markers = [];
      var that = this;
      this.state.classifieds.map(function(classified){
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

          markers.push(marker);
        }
      })
      return markers;
    },

    placeMarkers: function (map, markers){
      markers.forEach(function(marker){
        marker.setMap(map);
      })
    },

    buildHtmlString: function(classified){
      if (classified.images[0] === undefined){
        var imgPath = 'http://res.cloudinary.com/dfb4gjjt4/image/upload/v1445016807/no-image_zsxss7.jpg';
      } else {
        var imgPath = classified.images[0].img_path;
      }
      var string = classified.title + " ----$ " + classified.price;
      return (
        "<img width='200' height='150' src=" + imgPath + "></img>" + "<br>" +
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
