angular.module('WebChat').directive('conversationHeader',[function() {
return {
      restrict: 'E',
      templateUrl: 'app/directives/conversationHeader.html',
      scope: {
            title: '@'
      }
}
}]);
