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

    post: function (params){
      $.ajax({
        url: "api/classified",
        type: "POST",
        dataType: "json",
        data: params,
        success: function(response){
          ApiActions.createdNewClassified();
        },
        error: function(response){
          var errors = response.responseJSON;
          ErrorActions.recivedErrors(errors);
        }
      })
    }
  }

}(this));
