// A channel object contains information about a chat room and it's messages
class Channel {

      constructor(id, name) {
            this.id = id;
            // Check if a name has been provided
            if(!name) {
                  // If not set name to id
                  name = id;
            }

            this.name = name;
            if(name === 'general') {
                  this.isGeneral = true;
            }

            this.created = new Date();
            this.type = Channel.types().CHANNEL;
            this.messages = [];
            this.unreadCount = 0;
      }

      static types() {
            return {
                  CHANNEL: 0,
                   DM: 1
            };
      }

      get isChannel() {
            return this.type == Channel.types().CHANNEL;
      };

      get isDM() {
            return this.type == Channel.types().DM;
      };

      // Adds a message to the messages array
      addMessage(message) {
            this.messages.push(message);
            this.unreadCount++;
      }

      get conversationStatus() {
            if(this.status) {
                  return this.status;
            } else {
                  return '';
            }
      }

      markAsRead() {
            this.unreadCount = 0;
      }
}
