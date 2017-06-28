/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

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

  $urlRouterProvider.otherwise('/home');
}]);
