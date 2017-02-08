angular.module('WebChat').controller( 'ChatController', [ 'Events', 'Channels', '$scope', function( Events, Channels, $scope ) {
      var vm = this;
      // TODO Fix hacky bindings
      vm.data = Channels.data;

}]);
