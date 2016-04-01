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

  var user = localStorage.getItem('userChat')
  user = JSON.parse(user)

  $scope.comment = {
    name: user.username,
    text: null
  }

  $scope.comments = []

  socket.on('connect', function () {

    socket.emit('add user',user.username)
  })

  socket.on('new message', function (data) {
    $scope.comments.push({name: data.username, text: data.message})
    $ionicScrollDelegate.$getByHandle('scroll').scrollBottom()
  })

  $scope.sendMessage = function () {
    $scope.comments.push({name: $scope.comment.name, text: $scope.comment.text})
    socket.emit('new message', $scope.comment.text)
    console.log($scope.comments)
    $scope.comment.text = null
  }

})
