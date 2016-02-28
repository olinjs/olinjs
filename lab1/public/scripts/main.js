// Main clientside javascript file
// Contains main angular controller which handles all rendering and requests

var app = angular.module('wikiApp', ['ngRoute']);

function fetchPages() {}; // Function stub
function resetContent() {};

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
		console.log("Fetching pages");
		$http.get('./pages').then(function success(res) {
			$scope.pages = res.data.reverse();
		}, function error(err) {
			console.log(err);
		});
	};

	// Show the page creation controls in the content div
	// $scope.dispMakePageMenu = function(default_title, default_content) {

	// 	// Automatically populate the title field if we are editing a page
	// 	if (default_title != undefined && default_title.length) {
	// 		$scope.newpage_title = default_title;
	// 	} else {
	// 		$scope.newpage_title = '';
	// 	}

	// 	// Automatically populate the content field if we are editing a page
	// 	if (default_content != undefined && default_content.length) {
	// 		$scope.newpage_content = default_content;
	// 	} else {
	// 		$scope.newpage_content = '';
	// 	}

	// 	// Inject the content div with a wrapper div that includes the actual controls html file
	// 	$scope.pagecontent = $sce.trustAsHtml("<div class=\"ng-scope\" ng-include src=\"'views/pageCreationControls.html'\"></div>");
	// }

	// Request the server to create a new page
	$scope.addPage = function(author) { 
		if ($scope.newpageTitle == undefined || $scope.newpageContent == undefined) {
			return;
		}

		// Inject page controls into page content
		data = {"title": $scope.newpageTitle, "content": $scope.newpageContent, "author": author, "timestamp": new Date().getTime()};

		console.log(data);
		$http.post('./pages/new', JSON.stringify(data)).then(function success(res) {
			console.log(res);
			fetchPages(); // Refresh page list
			resetContent(); // Reset menu to show blank page
		}, function error(err) {
			console.log(err);
		});
	};

	// Show controls to edit currently viewed page
	$scope.showPageEditControls = function() {
		// Show page creationg controls but pass current page title and content to autofill fields with
		dispMakePageMenu(default_title, default_content);
	}

	$scope.hideControls = function() {
		$scope.controls='';
	}

	// Request the server to delete a page
	$scope.deletePage = function(id) {
		console.log(id);
		$http.delete('./pages/byid/' + id + '/delete').then(function success(res) {
			fetchPages();
			resetContent(); // Reset menu to show blank page
		}, function error(err) {
			console.log(err);
		});
	};

	// Request the content of a page from the server
	$scope.fetchPageContent = function(id) {
		console.log("Fetching page " + id);
		$http.get('./pages/byid/' + id).then(function success(res) {
			// Set app var to keep track of what page we are on
			$scope.currentpageid = id;
			// Inject sanitized html
			console.log("Displaying ", res.data.substr(1, res.data.length - 2));
			$scope.pagecontent = $sce.trustAsHtml(res.data.substr(1, res.data.length - 2));
			$scope.controls = 'pageControls';
		}, function error(err) {
			console.log(err);
		});
	}

	// Reset the content div to show nothing
	resetContent = function() {
		$scope.pagecontent = "";
	}

	// Initial fetch
	fetchPages();
});

// app.directive('ngEnterKeyPressed', function() {
//     return function(scope, element, attrs) {
//         element.bind("keydown keypress", function(event) {
//             var keyCode = event.which || event.keyCode;

//             // If enter key is pressed
//             if (keyCode === 13) {
//         		addTodo($(element).val());
//         		$(element).val('');
//                 event.preventDefault();
//             }
//         });
//     };
// });