var app = angular.module('chirpApp', ['ngRoute','ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.currentUser = 'Guest';

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.currentUser = 'Guest';
  };

  $rootScope.usersPost = function(post){
    if(post.createdBy===$rootScope.currentUser){
       return true;
    }
    return false;
  };
}
);

/*angular routing*/
app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});

/*services*/ 
app.factory('postService', function($resource){
 return $resource('/api/posts/:id');
});

/*controllers*/
app.controller('mainController', function($scope, postService, $rootScope){
  $scope.posts = postService.query();
  $scope.newPost = {createdBy: '', text: '', createdAt: ''};


  $scope.post = function(){
    $scope.newPost.createdAt = Date.now();
    $scope.newPost.createdBy = $rootScope.currentUser;
    postService.save($scope.newPost, function(){
      $scope.posts = postService.query();
      $scope.newPost = {createdBy: '', text: '', createdAt: ''};
    });
  };

  $scope.delete = function(post)  {
    postService.delete({id: post._id});
    $scope.posts = postService.query();
  };
});

app.controller('authController', function($scope, $rootScope, $http, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      $rootScope.authenticated = true;
      $rootScope.currentUser = data.user.username;

      $location.path('/');
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      $rootScope.authenticated = true;
      $rootScope.currentUser = data.user.username;

      $location.path('/');
    });
  };
});