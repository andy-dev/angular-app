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
  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', '$location', 'FIREBASE_URL', 'authService',function($scope, $firebaseSimpleLogin, $location, FIREBASE_URL, authService) {
    var authRef = new Firebase(FIREBASE_URL);

    var auth = $firebaseSimpleLogin(authRef);

    $scope.user = {email: '', password: ''};

    $scope.register = function(){
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data){
        console.log(data);
        // auth.$login('password', $scope.user);
        $scope.login();
      });
    };

    $scope.login = function(){
      auth.$login('password', $scope.user).then(function(data){
        console.log(data);
        $location.path('/waitlist')
      });
    };

    $scope.logout = function(){
      auth.$logout();
      $location.path('/');
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