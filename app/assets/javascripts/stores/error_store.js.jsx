(function(root) {
  'use strict';

  var _errors = [];

  var clearErrors = function (){
    _errors = [];
  };

  var setErrors = function (errors){
    _errors = errors;
  };

  root.ErrorStore = $.extend ({}, EventEmitter.prototype, {

    all: function (){
      var errors = _errors.slice(0);
      window.setTimeout( function (){
        clearErrors();
      }, 60)
      return errors
    },

    addErrorHandler: function(handler){
      ErrorStore.on(ErrorConstants.NEW_ERRORS, handler);
    },

    removeErrorHandler: function(handler){
      ErrorStore.removeListener(ErrorConstants.NEW_ERRORS, handler);
    },

    DispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType){

        case ErrorConstants.RECIVED_ERRORS:
        setErrors(payload.errors);
        ErrorStore.emit(ErrorConstants.NEW_ERRORS)
        break;
      }



    })
  });

}(this));
