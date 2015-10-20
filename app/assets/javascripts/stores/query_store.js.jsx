(function(root) {
  'use strict';

  var _query_params = {
    keyword: {
      keyword: ""
    },
    car_params: {
      make: "",
      model: "",
      min_year: "",
      max_year: ""
    },
    price_params: {
      min_price: "",
      max_price: ""
    },
    odometer_params: {
      min_odometer: "",
      max_odometer: ""
    },
    location_params: {
      address: "",
      city: "",
      state: "",
      zip: "",
      distance: ""
    }
  };

  var updateKeyword = function(keyword){
    _query_params["keyword"] = keyword;
  };

  var updateCarParams = function(car_params){
    _query_params["car_params"] = car_params;
  };

  var updatePriceParams = function(price_params){
    _query_params["price_params"] = price_params;
  };

  var updateOdometerParams = function(odometer_params){
    _query_params["odometer_params"] = odometer_params;
  };

  var updateLocationParams = function(location_params){
    _query_params["location_params"] = location_params;
  };

  var parseLocationParams = function(location_params, callback){
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

  };



  root.QueryStore = $.extend ({}, EventEmitter.prototype, {

    run: function(){
      var params = QueryStore.all();
      var callback = function(response){
        var parsed_location_params = response;
        parsed_location_params["distance"] = params["location_params"]["distance"];
        params["location_params"] = parsed_location_params;
        ApiUtil.fetch(params);
      };
      parseLocationParams(params["location_params"], callback);
    },

    all: function(){
      return $.extend ({}, _query_params);
    },

    keyword: function(){
      return $.extend ({}, _query_params["keyword"])
    },

    carParams: function(){
      return $.extend ({}, _query_params["car_params"])
    },

    priceParams: function(){
      return $.extend ({}, _query_params["price_params"])
    },

    odometerParams: function(){
      return $.extend ({}, _query_params["odometer_params"])
    },

    locationParams: function(){
      return $.extend ({}, _query_params["location_params"])
    },

    DispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType){

        case QueryConstants.KEYWORD_UPDATE:
        updateKeyword(payload.keyword);
        break;

        case QueryConstants.CAR_UPDATE:
        updateCarParams(payload.car_params);
        break;

        case QueryConstants.PRICE_UPDATE:
        updatePriceParams(payload.search_params);
        break;

        case QueryConstants.ODOMETER_UPDATE:
        updateOdometerParams(payload.search_params);
        break;

        case QueryConstants.LOCATION_UPDATE:
        updateLocationParams(payload.location_params);
        break;
      }
    })


  });


}(this));
