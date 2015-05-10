'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  // .value('FIREBASE_URL', 'http://waitandeat-andydev.firebaseio.com/')
  .factory('FIREBASE_URL', function() {
    return 'http://waitandeat-andydev.firebaseio.com/';
  })
  .factory('dataService', function($firebase,FIREBASE_URL){
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;
  })
  .factory('partyService', function(dataService){

    var parties = dataService.$child('parties');

    var partyServiceObject = {
      parties: parties,
      saveParty: function(party){
        parties.$add(party);
      }
    };
    return partyServiceObject
  })
  .factory('textMessageService', function(dataService, partyService){
      var textMessages = dataService.$child('textMessages');

      var textMessagesServiceObject = {
        sendTextMessage: function(party){
          var newTextMessage = {
            phoneNumber: party.phone,
            size: party.size,
            name: party.name
          };
          textMessages.$add(newTextMessage);
          party.notified = 'Yes';
          partyService.parties.$save(party.$id);
        }
      };

      return textMessagesServiceObject;
  })
  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL){
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);

    var authServiceObject = {
      register: function(user){
        auth.$createUser(user.email, user.password).then(function(data){
        console.log(data);
        // auth.$login('password', $scope.user);
        authServiceObject.login(user);
        $scope.login();
        });
      },
      login: function(user){
        auth.$login('password', user).then(function(data){
        console.log(data);
        $location.path('/waitlist')
        });
      },
      logout: function(){
        auth.$logout();
        $location.path('/');
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.currentUser = null;
    });


    return  authServiceObject;
  });
