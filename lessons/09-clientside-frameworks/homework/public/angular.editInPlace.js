myTodo.directive( 'editInPlace', function() {
  return {
    restrict: 'E',
    scope: { value: '=' ,
             callback: '&'},
    template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
    link: function ( $scope, element, attrs ) {
      // Let's get a reference to the input element, as we'll want to reference it.
      var inputElement = angular.element( element.children()[1] );
      
      // This directive should have a set class so we can style it.
      element.addClass( 'edit-in-place' );
      
      // Initially, we're not editing.
      $scope.editing = false;
      
      // ng-click handler to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;
        
        // We control display through a class on the directive itself. See the CSS.
        element.addClass( 'active' );
        
        // And we must focus the element. 
        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
        // we have to reference the first element in the array.
        inputElement[0].focus();
      };
      
      // When we leave the input, we're done editing.
      inputElement.prop( 'onblur', function() {
        console.log("blur")
        $scope.editing = false;
        element.removeClass( 'active' );
        $scope.callback()
      });

      inputElement.keyup(function (e) {
        if ($(".input1:focus") && (e.keyCode === 13)) {
          $scope.editing = false;
          element.removeClass( 'active' );
          $scope.callback()
        }
      });
    }
  };
});