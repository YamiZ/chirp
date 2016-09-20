var app = angular.module('chirpApp', []);

app.controller('mainController', function($scope){
  $scope.posts = [];
  $scope.newPost = {createdBy: '', text: '', createdAt: ''};

  $scope.post = function(){
    $scope.newPost.createdAt = Date.now();
    console.log($scope.newPost);
    $scope.posts.push($scope.newPost);
    $scope.newPost = {createdBy: '', text: '', createdAt: ''};
  };
});

app.controller('authController', function($scope){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.register = function(){
    //placeholder until authentication is implemented
    $scope.error_message = 'registeration request for ' + $scope.user.username;
  };
});