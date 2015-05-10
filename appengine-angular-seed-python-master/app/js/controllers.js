'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function(){
  }])
  .controller('WaitListController', ['$scope','$firebase', 'FIREBASE_URL',function($scope, $firebase, FIREBASE_URL) {
    //connect $scope.parties to liive firebase data
    var partiesRef = new Firebase(FIREBASE_URL + 'parties');

    $scope.parties = $firebase(partiesRef);
    // Object to store data from the waitlist form
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    // function to save a new party to waitlist
    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
    };

    //send text message to party
    $scope.sendTextMessage = function(party){
      var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      };
      textMessages.$add(newTextMessage);
      party.notified = 'Yes' ;
      $scope.parties.$save(party.$id);
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


// instead of being an array will conect it to our firebase service
// takes a parameter that is reference to our parties
// we are going to use add instead of push, will add data to our firebase
// $scope.parties.push($scope.party);
// $scope.parties is now a firebase object

// inject firebase service into our controller
// instead of an array we have an object
// now we have something diff we have a key and all of this {"-JoVgC_7T0NnIemxEIm8":{"name":"andy","phone":"3462345","size":"4
// if we go to our firebase dashboard, we can see we have two items,
// if we delete all of our data, it goes away in our app too

// you could do $scope.authService = authService
// and then you would have ng-click = authService.logout() and have a very simple app
// but its better for sperate methods in the view