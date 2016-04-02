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

.controller('ChatCtrl', function ($scope, $ionicScrollDelegate, $cordovaVibration, $ionicModal, socket, Camera) {

  $ionicModal.fromTemplateUrl('templates/camera.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  }
  $scope.closeModal = function() {
    $scope.modal.hide()
  }

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
    $cordovaVibration.vibrate(100)
  })

  $scope.sendMessage = function () {
    $scope.comments.push({name: $scope.comment.name, text: $scope.comment.text})
    $ionicScrollDelegate.$getByHandle('scroll').scrollBottom()
    socket.emit('new message', $scope.comment.text)
    $scope.comment.text = null
  }

  $scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
  }

})
