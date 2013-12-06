angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function(){
	return {
		restrict: 'EA',
		scope: {
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

			var valueProperty = attrs.valueproperty;

			scope.itemSelected = function(item){
				scope.onSelect()(item);
			}

			scope.getItemTemplate = function(item){
				if(valueProperty != undefined){
					return item[valueProperty];
				}else{
					return item;
				}
			};
		},
		template: '<div><input type="text" ng-model="ngModel" />' +
		'<div ng-click="itemSelected(item)" ng-repeat="item in items">{{getItemTemplate(item)}}</div>'
	};	
});