var app = angular.module('acSample', ['ngAutocompleteModule']);

app.factory('listService', function($q, $timeout){
	return {
		getList: function(count){
			var all  = [{text: 'hello', key: 1}, 
						{text: 'a', key: 2}, 
						{text: 'bunch', key:3}, 
						{text: 'of', key: 4},
						{text: 'things', key: 5}
						];	
			var deferred = $q.defer();
			$timeout(function(){
				deferred.resolve(all.slice(0,count));
			}, 2);
			return deferred.promise; 
		},
		getSimple: function(count){
			var all  = [1,2,3,4,5];	
			var deferred = $q.defer();
			$timeout(function(){
				deferred.resolve(all.slice(0,count));
			}, 2);
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

	$scope.getSimple = function(count){
		return listService.getSimple(count);
	}
});