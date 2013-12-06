angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function(){
	return {
		restrict: 'EA',
		scope: {
			ngModel: '=',
			onSelect: '&',
			retrievalMethod: '&'
		},
		link: function(scope, something, attrs){
			scope.$watch('ngModel', function(oldVal, newVal) {
				if(!(oldVal == undefined && newVal == undefined)){
					scope.retrievalMethod()(scope.ngModel)
					.then(function(data){
						scope.items = data;
					});
				}
			});

			scope.itemSelected = function(item){
				scope.onSelect()(item);
			}
		},
		template: '<div><input type="text" ng-model="ngModel" />' +
		'<div ng-click="itemSelected(item)" ng-repeat="item in items">{{item}}</div>'
	};	
});