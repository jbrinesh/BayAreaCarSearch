(function(root) {
  'use strict';

  var _query_params = {
    keyword: "",
    car_params: {
      make: "",
      model: "",
      min_year: "",
      max_year: ""
    },
    search_params: {
      min_odometer: "",
      max_odometer: "",
      min_price: "",
      max_price: ""
    }
  };

  var updateKeyword = function(keyword){
    _query_params["keyword"] = keyword;
  };

  var updateCarParams = function(car_params){
    _query_params["car_params"] = car_params;
  };

  var updateSearchParams = function(search_params){
    _query_params["search_params"] = search_params;
  };



  root.QueryStore = $.extend ({}, EventEmitter.prototype, {

    all: function(){
      return $.extend ({}, _query_params);
    },

    keyword: function(){
      return $.extend ({}, _query_params["keyword"])
    },

    car_params: function(){
      return $.extend ({}, _query_params["car_params"])
    },

    search_params: function(){
      return $.extend ({}, _query_params["search_params"])
    },

    DispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType){

        case QueryConstants.KEYWORD_UPDATE:
        updateKeyword(payload.keyword);
        break;

        case QueryConstants.CAR_UPDATE:
        updateCarParams(payload.car_params);
        break;

        case QueryConstants.SEARCH_UPDATE:
        updateSearchParams(payload.search_params);
        break;
      }
    })


  });


}(this));
