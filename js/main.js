/**
 * Main AngularJS Web Application
 */
var app = angular.module('myApp', [ 'ui.router']);
/* Fonctionnel !!! */
app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/home',
    templateUrl: 'partials/home.html',
    controller: 'AppCtrl'
  })
}]);
/**
 * Configuration du module principal : routeApp *
 routeApp.config(['$routeProvider',
    function($routeProvider) {

        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        .when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'contactCtrl'
        });
    }
]);*/
