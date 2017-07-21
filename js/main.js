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
/*
//Passage du Ct en paramètre dans l'URL
app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
  $stateProvider
    .state('home', {
    url: '/home',
    templateUrl: 'partials/home.html',
    controller: 'AppCtrl'
  })*/
}]);
