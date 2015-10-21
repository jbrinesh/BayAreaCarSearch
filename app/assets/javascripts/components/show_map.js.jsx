(function(root) {
  'use strict';

  root.ShowMap = React.createClass({

    componentDidMount: function (){
      var position = {lat: this.props.classified.lat, lng: this.props.classified.lng};
      var mapOptions = {
        center: position,
        zoom: 13
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions)
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: this.props.classified.title
      });
      marker.setMap(map);
    },

    render: function(){
      return(
        <div id="map" className="show-map"></div>
      )
    }

  });
}(this));
