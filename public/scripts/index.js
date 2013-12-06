var app = angular.module('acSample', ['ngAutocompleteModule']);

app.controller('indexCtrl', function($scope, $q, $timeout){
	$scope.items = ['one', 'two', 'three'];

	$scope.selected = function(){
		alert('called');
	}

	$scope.somethingElse = function(count){
      	var all  = ['hello', 'a', 'bunch', 'of', 'things']	
		return all.slice(0,count);
	}
});