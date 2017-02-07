class Channels {

      constructor(Users) {
            this.presetChannels = ['general'];
            this.channels = {};
            this.activeChannel = {};
            this.Users = Users;
            this.data = {channel: {}};

            this.addChannelsWithNames(this.presetChannels);
      }

      // Convenience function to create a channel for each name in names
      addChannelsWithNames(names) {
            // Create conversations
            for(var i = 0; i < names.length;i++) {
                  const channelID = names[i];
                  const channel = new Channel(channelID, channelID);
                  this.addChannel(channel);
            }
      }

      // Checks whether a channel with id exists in hash
      hasChannelWithID(id) {
            return this.channels.hasOwnProperty(id);
      }

      // Sets current active channel to channel with channelID
      setChannelForChannelID(channelID) {
            this.activeChannel = {name: channelID, type: 'channel', id: channelID};
            this.data.channel = this.channels[channelID];
      }

      // Sets active channel as a DM for user with usernane
      setChannelForUsername(username) {
            this.activeChannel = {
                  name: username,
                  id: DMChannel.idForUsernames(this.Users.getUser().name, username)
            };
            this.data.channel = this.channels[this.activeChannel.id];

      }

      // Convenience function to create a direct message channel
      // between current user and a specific user
      createDMChannelForUser(user) {
            return new DMChannel(this.Users.getUser(), user);
      }

      // Convenience function to which creates and adds a DMChannel for each user in users
      addDMChannelsForUsers(users) {
            const self = this;
            users.forEach((user) => {
                  var userChannel = self.createDMChannelForUser(new User(user.name));
                  self.addChannel(userChannel);
            });
      }

      // Adds a channel to hash channels
      addChannel(channel) {
            this.channels[channel.id] = channel;
      }

      // Adds a message to channel with ID
      addMessageToChannelWithID(message, channelID) {
            // If no channelID is provided, default to activeChannel
            if(!channelID) {
                  channelID = this.activeChannel.id;
            }

            this.channels[channelID].addMessage(message);
      }

}

angular.module('WebChat').service( 'Channels', Channels);
Channels.$inject = ['Users'];
