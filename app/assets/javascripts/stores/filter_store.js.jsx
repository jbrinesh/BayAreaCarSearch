(function(root) {
  'use strict';

  var _view = ListIndexItem;
  var _sorting = ["price", "DEC"];

  var updateView = function(view){
    _view = view;
  };

  var updateSorting = function(sorting){
    _sorting = sorting;
  };

  root.FilterStore = $.extend({}, EventEmitter.prototype, {
    view: function(){
      return  _view
    },

    sorting: function(){
      return _sorting.slice(0)
    },

    addViewChangeHandler: function(handler){
      FilterStore.on(FilterConstants.VIEW_CHANGED, handler)
    },

    removeViewChangeHandler: function(handler){
      FilterStore.removeListener(FilterConstants.VIEW_CHANGED, handler)
    },

    addSortingChangeHandler: function(handler){
      FilterStore.on(FilterConstants.SORTING_CHANGED, handler)
    },

    removeSortingChangeHandler: function(handler){
      FilterStore.removeListener(FilterConstants.SORTING_CHANGED, handler)
    },

    DispatcherID: AppDispatcher.register(function(payload){
      switch (payload.actionType){

        case FilterConstants.RECIVED_VIEW:
        updateView(payload.view);
        FilterStore.emit(FilterConstants.VIEW_CHANGED);
        break;

        case FilterConstants.RECIVED_SORTING:
        updateSorting(payload.sorting);
        FilterStore.emit(FilterConstants.SORTING_CHANGED);
        break;

      }
    })
  })
}(this));
