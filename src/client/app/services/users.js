angular.module('WebChat').service( 'Users', ['socket','$http', 'SocketEvent', function(socket, $http, SocketEvent) {

      var self = this;

      this.randomID = function(length) {
            // If length not present, then use default length
            length = length || 5;
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ ) {
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
      };


      this.activeUsers = [];
      this.user = {};

      // Removes user from active user with username
      this.removeUserWithUsername = function(username) {
            console.log('removing user ' + username);

            // Remove user
            for(var i = 0; i < self.activeUsers.length; i++) {
                  if(self.activeUsers[i].name === username) {
                        console.log('found removing user ' + username);

                        // Remove from array
                        self.activeUsers.splice(i, 1);
                        break;
                  }
            }
      };

      // Gets currently active users from server
      this.getExistingActiveUsers = function() {
            $http({method: 'get', url: '/users'}).then(function successCallback(response) {
                  var users = response.data;
                  // self.removeUserWithUsername(user.name, users);
                  self.activeUsers = users;
            });
      }



      this.getExistingActiveUsers();

      // Sends new user to server via socket
      this.sendNewUserToServer = function(user) {
            // Tell the server your username
            socket.emit(SocketEvent.ADD_USER, user.name);
      }

      // Adds user to active users
      this.addUser = function(user) {
            this.activeUsers.push(user);
            this.sendNewUserToServer(user);
      };



      this.getUser = function() {
            return self.user;
      };

      this.setUser = function(username) {
            username = username || this.randomID()
            self.user = {name: username};

            socket.emit('add user', username);
      };

}]);
