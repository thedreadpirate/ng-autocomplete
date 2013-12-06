var app = angular.module('acSample', ['ngAutocompleteModule']);

app.factory('listService', function($q, $timeout){
	return {
		getList: function(count){
			var all  = ['hello', 'a', 'bunch', 'of', 'things']	
			var deferred = $q.defer();
			$timeout(function(){
				deferred.resolve(all.slice(0,count));
			}, 500 );
			return deferred.promise; 
		}
	};
});

app.controller('indexCtrl', function($scope, listService){
	$scope.items = ['one', 'two', 'three'];

	$scope.selected = function(item){
		alert(item);
	}

	$scope.getOptions = function(count){
		return listService.getList(count);
	}
});