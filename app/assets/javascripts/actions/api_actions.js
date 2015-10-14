(function(root) {
  'use strict';

  root.ApiActions = {
    recivedClassifieds: function (classifieds){
      var action = {
        actionType: ClassifiedConstants.RECIVED_CLASSIFIEDS,
        classifieds: classifieds
      }
      AppDispatcher.dispatch(action);
    }

    
  }
}(this));
