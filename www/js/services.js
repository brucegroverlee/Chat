angular.module('starter.services', [])

.constant('config', {
  //loginUrl: 'http://localhost:3000/login',
  loginUrl: 'https://arcane-sands-77620.herokuapp.com/login',
  socketUrl: 'http://chat.socket.io'
})

.factory('loginService', function ($http, $state, config) {
  function login (username, password) {

    console.log('username: ' + username)
    console.log('password: ' + password)

    $http({
      method: 'POST',
      url: config.loginUrl,
      data: {
        username: username,
        password: password
      }
    })
    .then(
      function (response) {
        console.log('$http: ')
        console.log(response.data)
        if (response.data.status === 'Ok') {
          var lsValue = JSON.stringify({username: response.data.username})
          localStorage.setItem('userChat', lsValue)
          $state.go('tab.chats')
        }
      },
      function (response) {
        console.log('Error $http')
      }
    )
  }

  return {
    login: login
  }
})

.factory('socket', function(socketFactory, config){
 var myIoSocket = io.connect(config.socketUrl);

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

return mySocket;
})
