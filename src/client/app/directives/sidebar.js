angular.module('WebChat').directive('sidebar',   ['Channels','Users', function(Channels, Users) {
return {
      restrict: 'E',
      templateUrl: 'app/directives/sidebar.html',
      controller: SidebarController,
      controllerAs: 'sidebarCtrl',
      replace: true,
}
}]);
