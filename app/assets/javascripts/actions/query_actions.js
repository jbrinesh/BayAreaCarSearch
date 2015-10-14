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

    updateSearchParams: function(search_params){
      var action = {
        actionType: QueryConstants.SEARCH_UPDATE,
        search_params: search_params
      }
      AppDispatcher.dispatch(action);
    }

  }

}(this));
