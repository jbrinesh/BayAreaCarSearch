(function(root) {
  'use strict';
  root.QueryActions = {

    updateKeyword: function(keyword){
      var action = {
        actionType: QueryConstants.KEYWORD_UPDATE,
        keyword: keyword
      }
      AppDispatcher.dispatch(action);
    },

    updateCarParams: function(car_params){
      var action = {
        actionType: QueryConstants.CAR_UPDATE,
        car_params: car_params
      }
      AppDispatcher.dispatch(action);
    },

    updatePriceParams: function(price_params){
      var action = {
        actionType: QueryConstants.PRICE_UPDATE,
        search_params: price_params
      }
      AppDispatcher.dispatch(action);
    },

    updateOdometerParams: function(odometer_params){
      var action = {
        actionType: QueryConstants.ODOMETER_UPDATE,
        search_params: odometer_params
      }
      AppDispatcher.dispatch(action);
    },

    updateLocationParams: function(location_params){
      var action = {
        actionType: QueryConstants.LOCATION_UPDATE,
        location_params: location_params
      }
      AppDispatcher.dispatch(action);
    }


  }

}(this));
