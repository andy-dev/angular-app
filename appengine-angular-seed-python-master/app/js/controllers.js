'use strict';
/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function(){
  }])
  .controller('WaitListController', ['$scope', 'partyService', 'textMessageService', 'authService', function($scope, partyService, textMessageService, authService) {
    //Bind users partiest to $scope.parties
    authService.getCurrentUser().then(function(user) {
      if (user) {
        $scope.parties = partyService.getPartiesByUserId(user.id);
      };
    });
    // Object to store data from the waitlist form
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    // function to save a new party to waitlist
    $scope.saveParty = function(){
      partyService.saveParty($scope.newParty, $scope.currentUser.id);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    //send text message to party
    $scope.sendTextMessage = function(party){
      textMessageService.sendTextMessage(party, $scope.currentUser.id);
    };
  }])
  .controller('AuthController', ['$scope', 'authService',function($scope, authService) {

    //object bound to input in login and register pages
    $scope.user = {email: '', password: ''};

    //method to register a new user using the authService
    $scope.register = function(){
      authService.register($scope.user);
    };

    //method to log in a user ustin the authService
    $scope.login = function(){
     authService.login($scope.user)
    };

    $scope.logout = function(){
      authService.logout()
    };
  }]);


