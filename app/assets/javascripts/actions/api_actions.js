(function(root) {
  'use strict';

  root.ApiActions = {
    recivedClassifieds: function (classifieds){
      var action = {
        actionType: ClassifiedConstants.RECIVED_CLASSIFIEDS,
        classifieds: classifieds
      }
      AppDispatcher.dispatch(action);
    },

    recivedAccountClassifieds: function (classifieds){
      var action = {
        actionType: ClassifiedConstants.RECIVED_ACCOUNT_CLASSIFIEDS,
        classifieds: classifieds
      }
      AppDispatcher.dispatch(action);
    },

    createdNewClassified: function (){
      var action = {
        actionType: ClassifiedConstants.CREATED_NEW_CLASSIFIED
      }
      AppDispatcher.dispatch(action);
    }


  }
}(this));
