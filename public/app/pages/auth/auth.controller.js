'use strict';

var app = angular.module('wecoApp');
app.controller('authController', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.credentials = {};
  $scope.user = User.me;
  $scope.isLoading = false;

  $scope.isLoginForm = function() {
    return $state.current.name == 'auth.login';
  };

  function login() {
    User.login($scope.credentials).then(function() {
      // successful login; redirect to home page
      $scope.isLoading = false;
      $state.go('weco.home');
    }, function(response) {
      // TODO: pretty error
      alert(response.message);
      $scope.isLoading = false;
    });
  }

  function signup() {
    User.signup($scope.credentials).then(function() {
      // successful signup; redirect to home page
      $scope.isLoading = false;
      $state.go('weco.home');
    }, function(response) {
      // TODO: pretty error
      alert(response.message);
      $scope.isLoading = false;
    });
  }

  $scope.submit = function() {
    $scope.isLoading = true;
    if($scope.isLoginForm()) {
      login();
    } else {
      signup();
    }
  };
}]);
