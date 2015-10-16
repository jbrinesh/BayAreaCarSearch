(function(root) {
  'use strict';

  root.AccountUtil = {
    signOut: function(){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(response){
          window.location = "/";
        }
      })
    },

    fetch: function(params){
      $.ajax({
        url: "api/classified/account",
        type: "GET",
        success: function(response){
          ApiActions.recivedAccountClassifieds(response);
        }
      })
    },

    post: function (attr){
      $.ajax({
        url: "api/classified",
        type: "POST",
        dataType: "json",
        data: attr,
        success: function(response){
          AccountUtil.fetch();
        },
        error: function(response){
          var errors = response.responseJSON;
          ErrorActions.recivedErrors(errors);
        }
      })
    }
  }

}(this));
