(function(root) {
  'use strict';

  root.FilterActions = {

    updateView: function(view){
      var action = {
        actionType: FilterConstants.RECIVED_VIEW,
        view: view
      }
      AppDispatcher.dispatch(action);
    },

    updateSorting: function(sorting){
      var action = {
        actionType: FilterConstants.RECIVED_SORTING,
        sorting: sorting
      }
      AppDispatcher.dispatch(action);
    }
  };
}(this));
