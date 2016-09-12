'use strict';

var app = angular.module('wecoApp');
app.controller('authController', ['$scope', '$state', '$timeout', 'User', 'Alerts', function($scope, $state, $timeout, User, Alerts) {
  $scope.credentials = {};
  $scope.user = User.me;
  $scope.isLoading = false;
  $scope.errorMessage = '';
  $scope.showResendVerification = false;

  $scope.isLoginForm = function() {
    return $state.current.name == 'auth.login';
  };

  function login() {
    User.login($scope.credentials).then(function() {
      // successful login; redirect to home page
      $scope.isLoading = false;
      $state.go('weco.home');
    }, function(response) {
      $timeout(function() {
        $scope.errorMessage = response.message;
        $scope.isLoading = false;

        // if forbidden, account is not verified
        if(response.status == 403) {
          $scope.showResendVerification = true;
        }
      });
    });
  }

  function signup() {
    User.signup($scope.credentials).then(function() {
      // successful signup; redirect to home page
      $scope.isLoading = false;
      $state.go('weco.home');
      Alerts.push('success', 'Check your inbox to verify your account!', true);
    }, function(response) {
      $timeout(function() {
        $scope.errorMessage = response.message;
        $scope.isLoading = false;
      });
    });
  }

  $scope.submit = function() {
    $scope.isLoading = true;
    $scope.credentials.username = $scope.credentials.username.toLowerCase();
    if($scope.isLoginForm()) {
      login();
    } else {
      signup();
    }
  };

  $scope.resendVerification = function() {
    $scope.isLoading = true;
    User.resendVerification($scope.credentials.username).then(function() {
      Alerts.push('success', 'Verification email sent. Keep an eye on your inbox!', true);
      $timeout(function() {
        $scope.errorMessage = '';
        $scope.isLoading = false;
        $scope.showResendVerification = false;
      });
    }, function() {
      Alerts.push('error', 'Unable to resend verification email!', true);
      $timeout(function() {
        $scope.errorMessage = '';
        $scope.isLoading = false;
        $scope.showResendVerification = false;
      });
    });
  };
}]);
