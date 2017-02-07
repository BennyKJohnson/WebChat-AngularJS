class MessageFormController {

      constructor($http, Events, Channels) {
            this.$http = $http;
            this.Events = Events;
            this.Channels = Channels;

            this._typing = false;
            this.message = {};
            this.typingTimeout = 1000;
            this.lastTypingTime = 0;
      }

      get isTyping() {
            return this._typing;
      }

      set isTyping(newState) {
            // Check that the desired new state is different from old
            if(this.isTyping != newState) {
                  // Set new state
                  this._typing = newState;
                  // Send notification
                  if(newState) {
                        this.Events.sendTypingNotification();
                  } else {
                        this.Events.sendStopTypingNotification();
                  }
            }
      }

      // Checks that message text is correct and suitable to be sent.
      // more checks could be added here such as offensive language checks.
      messageIsValid(messageText) {
            return messageText.length > 0;
      }

      didReachTypingTimeout(timeDifference, timeout, isTyping) {
            return timeDifference >= timeout && isTyping;
      }

      send() {
            if(this.messageIsValid(this.message.text)) {
                  this.isTyping = false;
                  // Call service to send message
                  this.Events.sendMessage(this.message.text);
                  // Reset message
                  this.message = {};
            }
      }


      textBoxDidUpdate() {
            this.isTyping = true;
            this.lastTypingTime = (new Date()).getTime();
            // Create Timer event
            const self = this;
            setTimeout(function () {
                  const typingTimer = (new Date()).getTime();
                  const duration = typingTimer - self.lastTypingTime;
                  if (self.didReachTypingTimeout(duration, self.typingTimeout, self.isTyping)) {
                        self.isTyping = false;
                  }
            }, self.typingTimeout);
      }
}

angular.module('WebChat').controller( 'MessageFormController', MessageFormController);
MessageFormController.$inject = ['$http', 'Events', 'Channels'];
