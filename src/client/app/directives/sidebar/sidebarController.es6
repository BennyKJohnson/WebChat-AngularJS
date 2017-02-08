class SidebarController {

      constructor(Channels, Users) {
            this.Events = Events;
            this.Channels = Channels;

            // Setup properties
            this.channels = Channels.activeChannels;
            this.currentUser = Users.getUser();
            this.activeChannel = Channels.activeChannel;
            this.users = Users.activeUsers;
      }

      // Checks if the channel is currently active
      isActive(channel) {
            return this.activeChannel.id === channel.id;
      }

      // Sets the channel to active
      toggleChannel(channel) {
            this.Channels.setChannelForChannelID(channel.id);
            // TODO Fix binding in activeChannel
            this.activeChannel = this.Channels.activeChannel;
      }
}

angular.module('WebChat').controller( 'SidebarController', SidebarController);
SidebarController.$inject = ['Channels', 'Users'];
