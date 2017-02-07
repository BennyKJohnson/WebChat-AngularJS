angular.module('WebChat').controller( 'ChatController', [ 'Events', 'Channels', '$scope', function( Events, Channels, $scope ) {
      var vm = this;
      vm.data = Channels.data;

}]);
