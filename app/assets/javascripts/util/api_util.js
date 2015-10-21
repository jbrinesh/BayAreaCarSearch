(function(root) {
  'use strict';

  root.ApiUtil = {
    fetch: function(params){
       $.ajax({
        url: "api/classified",
        type: "GET",
        dataType: "json",
        data: params,
        success: function(response){
          ApiActions.recivedClassifieds(response);
        }
      })
    },

    geocode: function (address, callback){
      var Geocoder = new google.maps.Geocoder
      Geocoder.geocode(address, callback)
    },

    parseLocationParams: function(location_params, callback){
      var address_str =
        location_params["address"] + " " +
        location_params["city"] + " " +
        location_params["state"] + " " +
        location_params["zip"]
      ;
      if(address_str.trim().length === 0){
        var parsed_location_params = {};
        parsed_location_params["lat"] = "";
        parsed_location_params["lng"] = "";
        parsed_location_params["address"] = "";
        callback(parsed_location_params);
      }else {
        ApiUtil.geocode({address: address_str}, function(response){
          var parsed_location_params = {};
          parsed_location_params["lat"] = response[0].geometry.location.lat();
          parsed_location_params["lng"] = response[0].geometry.location.lng();
          parsed_location_params["address"] = response[0].formatted_address;
          callback(parsed_location_params);
        })
      }

    }

  }
}(this));

// params = {
//    car_params: {
//      make: "toyota",
//      model: "camery",
//      min_year: 2009,
//      max_year: 2009
//    },
//    search_params: {}
//  };
