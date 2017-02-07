class SidebarController {

      constructor(Channels, Users) {
            this.Events = Events;
            this.Channels = Channels;

            // Setup properties
            this.channels = Channels.presetChannels;
            this.currentUser = Users.getUser();
            this.activeChannel = Channels.activeChannel;
            this.users = Users.activeUsers;
      }

      isActive(channel) {
            return this.activeChannel.name === channel;
      }

      toggleChannel(channel, isChannel) {
            if(isChannel) {
                  this.Channels.setChannelForChannelID(channel);
            } else {
                  this.Channels.setChannelForUsername(channel.name);
            }
            this.activeChannel = this.Channels.activeChannel;
      }
}

angular.module('WebChat').controller( 'SidebarController', SidebarController);
SidebarController.$inject = ['Channels', 'Users'];
