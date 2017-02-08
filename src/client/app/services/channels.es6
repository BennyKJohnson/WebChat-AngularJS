class Channels {

      constructor(Users) {
            this.presetChannels = ['general'];
            this.channels = {};
            this.activeChannel = {};
            this.Users = Users;
            this.data = {channel: {}};
            this.activeChannels = [];

            this.addChannelsWithNames(this.presetChannels);
      }

      // Convenience function to create a channel for each name in names
      addChannelsWithNames(names) {
            // Create conversations
            names.forEach((name) => {
                  const channel = new Channel(name, name);
                  this.addChannel(channel);
            });
      }

      // Checks whether a channel with id exists in hash
      hasChannelWithID(id) {
            return this.channels.hasOwnProperty(id);
      }

      updateActiveChannel() {
            this.data.channel = this.channels[this.activeChannel.id];
            if(this.channels[this.activeChannel.id]) {
                  this.channels[this.activeChannel.id].markAsRead();
            }
      }

      // Sets current active channel to channel with channelID
      setChannelForChannelID(channelID) {
            this.activeChannel = {name: channelID, type: 'channel', id: channelID};
            this.updateActiveChannel();
      }

      // Sets active channel as a DM for user with usernane
      setChannelForUsername(username) {
            this.activeChannel = {
                  name: username,
                  id: DMChannel.idForUsernames(this.Users.getUser().name, username)
            };
            this.updateActiveChannel();
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
            this.activeChannels.push(this.channels[channel.id]);
      }

      removeChannelWithID(channelID) {
            // Remove from hash
            delete this.channels[channelID];
            // Remove channel from array
            for(var i = 0; i < this.activeChannels.length; i++) {
                  if(this.activeChannels[i].id === channelID) {
                        this.activeChannels.splice(i, 1);
                        break;
                  }
            }
      }
      /**
       Adds a message to channel with ID
       If no channelID is provided, default to activeChannel
       */
      addMessageToChannelWithID(message, channelID = this.activeChannel.id) {
            this.channels[channelID].addMessage(message);
            if(this.activeChannel.id !== channelID) {
                  // Update unreadCount
                  this.channels[channelID].unreadCount++;
            }
      }

}

angular.module('WebChat').service( 'Channels', Channels);
Channels.$inject = ['Users'];
