// Main clientside javascript file
// Contains main angular controller which handles all rendering and requests

var app = angular.module('wikiApp', ['ngRoute']);

function fetchPages() {}; // Function stubs
function resetContent() {};
function resetControls() {};

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/wrapper.html',
    	controller: "mainController"
    })

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $sce, $http, $location){
	$scope.pages = [];
	$scope.$sce = $sce;
	// Fill out function stubs
	fetchPages = function() {
		$http.get('./pages').then(function success(res) {
			$scope.pages = res.data.reverse();
		}, function error(err) {
			console.log(err);
		});
	};

	// Request the server to create a new page
	$scope.addPage = function(author) { 
		if ($scope.newpageTitle == undefined || $scope.newpageContent == undefined) {
			return;
		}

		// Inject page controls into page content
		data = {"title": $scope.newpageTitle, "content": $scope.newpageContent, "author": author, "timestamp": new Date().getTime()};
		$http.post('./pages/new', JSON.stringify(data)).then(function success(res) {
			fetchPages(); // Refresh page list
			resetContent(); // Reset menu to show blank page
			resetControls(); // Reset the controls to show blank page
		}, function error(err) {
			console.log(err);
		});
	};

	// Request the server to delete a page
	$scope.deletePage = function(id) {
		$http.delete('./pages/byid/' + id + '/delete').then(function success(res) {
			fetchPages();
			resetContent(); // Reset menu to show blank page
			resetControls();
		}, function error(err) {
			console.log(err);
		});
	};

	// Request the content of a page from the server
	$scope.fetchPageContent = function(id) {
		$http.get('./pages/byid/' + id).then(function success(res) {
			// Capture content from response
			var content = res.data.content;

			// Inject sanitized html
			$scope.pagecontent = $sce.trustAsHtml(content);

			// Set app vars to keep track of what page we are on
			$scope.current_page_content = content;
			$scope.current_page_title = res.data.title;
			$scope.current_page_id = id;
			// Display page controls (edit/remove)
			$scope.controls = 'pageControls';
		}, function error(err) {
			console.log(err);
		});
	}

	// Reset the content div to show nothing
	resetContent = function() {
		$scope.pagecontent = "";
	}

	// MAKE THE CONTROLS DISAPPEAR
	resetControls = function() {
		$scope.controls = "";
	}

	// Initial fetch
	fetchPages();
});