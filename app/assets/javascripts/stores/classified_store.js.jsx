(function(root) {
  'use strict';

  var _classifieds = [];
  var _account_classifieds = [];

  var resetClassifieds = function (classifieds){
    _classifieds = classifieds
  };

  var resetAccountClassifieds = function(classifieds){
    _account_classifieds = classifieds
  };

  root.ClassifiedStore = $.extend ({}, EventEmitter.prototype, {

    all: function(){
      return _classifieds.slice(0);
    },

    page: function(page_num){
      return this.sort(_classifieds).slice((page_num - 1) * 100, page_num * 100)
    },

    numOfPages: function(){
      return Math.ceil(_classifieds.length/100)
    },

    comparitor: function(sorting){
     return (function(a, b){
        if(a[sorting[0]] < b[sorting[0]]){
          return (sorting[1] === "DEC" ? 1 : -1);
        } else if(a[sorting[0]] > b[sorting[0]]){
          return (sorting[1] === "DEC" ? -1 : 1);
        } else {
          return 0;
        }
      })
    },

    sort: function(classifieds){
      return classifieds.sort(this.comparitor(FilterStore.sorting()))
    },

    account_all: function(){
      return _account_classifieds.slice(0);
    },

    find: function(id){
      var result;
      _account_classifieds.concat(_classifieds).forEach(function(classified){
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
        if (payload.classifieds.length === 100){
          QueryStore.run(2500);
        }
        break;

        case ClassifiedConstants.RECIVED_ACCOUNT_CLASSIFIEDS:
        resetAccountClassifieds(payload.classifieds);
        ClassifiedStore.emit(ClassifiedConstants.CLASSIFIEDS_CHANGED);
        break;

        case ClassifiedConstants.CREATED_NEW_CLASSIFIED:
        AccountUtil.fetch();
        ClassifiedStore.emit(ClassifiedConstants.CLASSIFIEDS_CHANGED);
        break;

      }
    })


  });

}(this));
