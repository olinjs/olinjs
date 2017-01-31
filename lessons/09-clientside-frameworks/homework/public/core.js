// public/core.js
var myTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.show = "All";

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        newTodoText = $scope.formData.text
        $scope.formData = {};
        $http.post('/api/todos/create', {text: newTodoText})
            .success(function(data) {
                // clear the form so our user is ready to enter another
                $scope.todos.push(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(todo) {
        var index = $scope.todos.indexOf(todo);
        console.log(index)
        if (index > -1) {
            $scope.todos.splice(index, 1);
        }
        $http.delete('/api/todos/delete/' + todo._id)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateTodo = function (changedTodo) {
        console.log(changedTodo)
        $http.post('/api/todos/update', changedTodo)
            .success(function(data) {
                console.log("update Successful");
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    /* Filter Function for All | Incomplete | Complete */
    $scope.showFn = function (todo) {
        if ($scope.show === "All") {
            return true
        }else if(todo.complete && $scope.show === "Complete"){
            return true;
        }else if(!todo.complete && $scope.show === "Incomplete"){
            return true;
        }else{
            return false;
        }
    };

    /* Filter Function for All | Incomplete | Complete */
    $scope.countActive = function (todo) {
        if (!todo.complete) {
            return true;
        }else{
            return false;
        }
    };


}
