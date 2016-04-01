angular.module('starter.controllers', [])

.controller('loginCtrl', function ($scope, loginService) {

  $scope.user = {
    username: null,
    password: null
  }

  $scope.login = function () {
    loginService.login($scope.user.username, $scope.user.password)
  }
})

.controller('ChatCtrl', function ($scope, $ionicScrollDelegate, socket) {

  $scope.comment = {
    name: null,
    text: null
  }

  $scope.comments = []

  socket.on('connect', function () {
    var user = localStorage.getItem('userChat')
    user = JSON.parse(user)
    socket.emit('add user',user.username)
  })

  socket.on('new message', function (data) {
    $scope.comments.push({name: data.username, text: data.message})
    $ionicScrollDelegate.$getByHandle('scroll').scrollBottom()
  })
})
