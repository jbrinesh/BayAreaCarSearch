(function(root) {
  'use strict';

  root.AccountUtil = {
    signOut: function(){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(response){
          console.log("success");
          window.location = "/";
        },
        error: function(response){
          debugger;
        }
      })
    }
  }

}(this));
