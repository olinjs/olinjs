var app = angular.module('todoApp', ['ngRoute']);

function addTodo(){}; // Function stub to be populated by app.controller callback
function fetchTodos() {}; // Function stub

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/todo.html',
    	controller: "mainController"
    })

    $locationProvider.html5Mode(true);
});

app.controller('mainController', function($scope, $http, $location){
	$scope.todos = [];
	// Fill out function stubs
	fetchTodos = function() {
		console.log("Fecthing todos");
		$http.get('./todo').then(function success(res) {
			$scope.todos = res.data.reverse();
		}, function error(err) {
			console.log(err);
		});
	};
	addTodo = function(text) { 
		data = {"text": text, "status": "in progress"};
		console.log(data);
		$http.post('./todo/new', JSON.stringify(data)).then(function success(res) {
			fetchTodos(); // Refresh todo list
		}, function error(err) {
			console.log(err);
		});
	};
	$scope.deleteTodo = function(id) {
		console.log(id);
		$http.delete('./todo/delete/' + id).then(function success(res) {
			fetchTodos();
		}, function error(err) {
			console.log(err);
		});
	};
	$scope.toggleStatus = function(id) {
		var data = {};
		$http.post('./todo/' + id + '/status/toggle', JSON.stringify(data)).then(function success(res) {
			fetchTodos();
		}, function error(err) {
			console.log(err);
		});
	};
	$scope.setFilter = function(filter) {
		$scope.filter = filter;
	}

	// Initial fetch
	fetchTodos();
});

app.directive('ngEnterKeyPressed', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
        		addTodo($(element).val());
        		$(element).val('');
                event.preventDefault();
            }
        });
    };
});