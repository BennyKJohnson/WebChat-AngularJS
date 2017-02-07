(function() {
      'use strict';

      angular.module('WebChat').directive("avatar",['Gravatar', 'emailFilter', function(Gravatar, emailFilter){
        return {
          replace: true,
          restrict: "E",
          template: "<img ng-src='{{imageURL()}}' class=\"avatar\">",
          scope: {user: "="},
          link: function(scope){
            scope.imageURL = function(){
                  var username = scope.user.name;
                  if(emailFilter(username)) {
                        return Gravatar(username);
                  } else {
                        // Generate Identicon
                        var data = new Identicon(username, 250).toString();
                        return 'data:image/png;base64,' + data;
                  }
            };
          }
        };
      }]);

})();
