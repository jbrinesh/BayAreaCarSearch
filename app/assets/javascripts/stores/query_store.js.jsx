(function(root) {
  'use strict';

  var _query_params = {
    limit: 100,
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

  root.QueryStore = $.extend({}, EventEmitter.prototype, {

    run: function(limit){
      var params = QueryStore.all();
      var callback = function(response){
        var parsed_location_params = response;
        parsed_location_params["distance"] = params["location_params"]["distance"];
        params["location_params"] = parsed_location_params;
        if (limit){
          params["limit"] = limit;
        }
        ApiUtil.fetch(params);
      };
      ApiUtil.parseLocationParams(params["location_params"], callback);
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
