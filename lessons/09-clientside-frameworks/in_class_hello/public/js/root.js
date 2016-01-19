var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/hello.html',
    	controller: "mainController"
    })

	.when('/next',
	{
		templateUrl : '../views/next.html',
		controller : 'nextController'
	})

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){
	$scope.helloMessage = "Helloooooo";
	$scope.nextButton = true;
	$scope.backButton = true;
});

app.controller('nextController', function($scope, $http, $location){
	$scope.helloMessage = "Awwww, we moved to the next page";
	$scope.backButton = false;

});