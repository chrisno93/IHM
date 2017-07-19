/**
 * Main AngularJS Web Application
 */
var app = angular.module('myApp', [ 'ui.router']);

/**
 * Configure the Routes
 */
app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'AppCtrl'
      })

//  $urlRouterProvider.otherwise('/home');
//  .controller(
//    'AppCtrl',
//    function($scope, $state) {
//      $scope.goSomewhere = function($state) {
//          $state.go(
//            '',
//            {variable : 'CT'}
//          );
//      }
//  })

}]);
