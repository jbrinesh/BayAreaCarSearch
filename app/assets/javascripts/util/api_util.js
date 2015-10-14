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
