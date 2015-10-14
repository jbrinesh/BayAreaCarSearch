(function(root) {
  'use strict';

  var _classifieds = [];

  var resetClassifieds = function (classifieds){
    _classifieds = classifieds
  };

  root.ClassifiedStore = $.extend ({}, EventEmitter.prototype, {

    all: function(){
      return _classifieds.slice(0);
    },

    find: function(id){
      var result;
      _classifieds.forEach(function(classified){
        if (classified.id === parseInt(id) ){
          result = classified;
        };
      })
      return result;
    },

    addChangeHandler: function(handler){
      ClassifiedStore.on(ClassifiedConstants.CLASSIFIEDS_CHANGED, handler)
    },

    removeChangeHandler: function(handler){
      ClassifiedStore.removeListener(ClassifiedConstants.CLASSIFIEDS_CHANGED, handler)
    },

    DispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType){

        case ClassifiedConstants.RECIVED_CLASSIFIEDS:
        resetClassifieds(payload.classifieds);
        ClassifiedStore.emit(ClassifiedConstants.CLASSIFIEDS_CHANGED);
        break;


      }
    })


  });

}(this));
