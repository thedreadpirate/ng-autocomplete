angular.module('ngAutocompleteModule', []).
	directive('ngAutocomplete', function(){
		return {
			restrict: 'EA',
			scope: {
				ngModel: '=',
				onSelect: '&',
			},
			link: function(scope, something, attrs){
				scope.items = scope.onSelect(0);
				scope.$watch('ngModel', function() {
					scope.onSelect(scope.ngModel);
				});
			},
			template: '<div><input type="text" ng-model="ngModel" />' +
			'<div ng-click="onSelect(1)" ng-repeat="item in items">{{item}}</div>' +
			'input: {{ngModel}}</div>'
		};	
	});