var app = angular.module('acSample', ['ngAutocompleteModule']);

app.factory('listService', function($q, $timeout){
	return {
		getList: function(count){
			var all  = [{text: 'text 1', key: 1}, 
						{text: 'text 2', key: 2}, 
						{text: 'text 3', key: 3}, 
						{text: 'text 4', key: 4},
						{text: 'text 5', key: 5},
						{text: 'text 6', key: 6}, 
						{text: 'text 7', key: 7}, 
						{text: 'text 8', key: 8},
						{text: 'text 9', key: 9},
						{text: 'text 10', key: 10}, 
						{text: 'text 11', key: 11}, 
						{text: 'text 12', key: 12},
						{text: 'text 13', key: 13},
						{text: 'text 14', key: 14}, 
						{text: 'text 15', key: 15}, 
						{text: 'text 16', key: 16},
						{text: 'text 17', key: 17},
						{text: 'text 18', key: 18},
						{text: 'text 19', key: 19},
						{text: 'text 20', key: 20}
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
        $scope.selectedItem = item;
	}

	$scope.getOptions = function(count){
		return listService.getList(count);
	}

	$scope.getSimple = function(count){
		return listService.getSimple(count);
	}
});