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
      this.props.classifieds.map(function(classified){
        if(classified.lat && classified.lng){
          var position = {lat: classified.lat, lng: classified.lng}
          var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: classified.title
          });
          marker.addListener('click', function (){
            this.props.clickHandler(classified.id);
          }.bind(this));
          this.setState({markers: this.state.markers.concat([marker])});
        }
      }.bind(this))
    },

    placeMarkers: function (map){
      this.state.markers.forEach(function(marker){
        marker.setMap(map);
      })
    },

    // handleClick: function(e){
    //   var lat = e.latLng.lat();
    //   var lng = e.latLng.lng();
    //   var id;
    //   this.props.classifieds.forEach(function(classified){
    //     if(classified.lat === lat && classified.lng === lng){
    //       id = classified.id;
    //     }
    //   })
    //   this.props.handleClick(id);
    // },

    render: function(){
      return(
        <div id="map" className="map-view"></div>
      )
    }

  });
}(this));
