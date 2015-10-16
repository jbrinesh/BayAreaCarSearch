(function(root) {
  'use strict';

  root.ErrorActions = {
    recivedErrors: function(errors){
      var action = {
        actionType: ErrorConstants.RECIVED_ERRORS,
        errors: errors
      }
      AppDispatcher.dispatch(action);
    }
  };
}(this));
