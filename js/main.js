/**
 * Main AngularJS Web Application
 */
var app = angular.module('myApp', [ 'ui.router']);
/* Fonctionnel !!! */
app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/home/{CT}',
    //url: '/home/{CT}/{user}',
    templateUrl: 'partials/home.html',
    controller: 'AppCtrl'
  })
}]);
