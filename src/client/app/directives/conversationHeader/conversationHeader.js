angular.module('WebChat').directive('conversationHeader',[function() {
return {
      restrict: 'E',
      templateUrl: 'app/directives/converationHeader/conversationHeader.html',
      scope: {
            title: '@'
      }
}
}]);
