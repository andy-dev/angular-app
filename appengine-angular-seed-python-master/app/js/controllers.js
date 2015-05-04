'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function(){

  }])
  .controller('WaitListController', ['$scope','$firebase',function($scope, $firebase) {

    var partiesRef = new Firebase('https://waitandeat-andydev.firebaseio.com/');

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name: '', phone: '', size: ''};

    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name: '', phone: '', size: ''};
    };
  }])


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