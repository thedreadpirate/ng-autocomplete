angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function($templateCache, $compile){
	return {
		restrict: 'EA',
		scope: {
			onSelect: '&',
			retrievalMethod: '&'
		},
		link: function(scope, element, attrs){

            var value_property = attrs.valueProperty;
            var advanced_display = attrs.advancedDisplay;
            var max_results = attrs.maxResults;
            var min_length = parseInt(attrs.minLength) || 1;
            var width = '400px';

            scope.getTemplate = function(){
                if(value_property != undefined){
                    return '{{ item["' + value_property + '"] }}';
                }else if(advanced_display != undefined){
                    return $templateCache.get(advanced_display);
                }else{
                    return '{{ item }}';
                }
            };

            var base_template = '<div class="ac-wrapper">' +
                                '    <input type="text" style="width:inherit" ng-model="ngModel" />' +
                                '    <div class="ac-items" style="width:inherit">' +
                                '       <div class="ac-item" style="width:inherit" ng-click="itemSelected(item)" ng-repeat="item in items">' +
                                            scope.getTemplate() +
                                '        </div>' +
                                '    </div>' +
                                '</div>';

			var retrieve_list = function(newVal, oldVal){
				return !(oldVal == undefined && newVal == undefined)
					&& newVal !== '' && newVal.length >= min_length;
			}

			scope.$watch('ngModel', function(newVal, oldVal) {
				if(retrieve_list(newVal, oldVal)){
					scope.retrievalMethod()(scope.ngModel, max_results)
					.then(function(data){
						scope.items = data;
					});
				}else{
					scope.items = [];
				}
			});

			scope.itemSelected = function(item){
				scope.onSelect()(item);
			}

            element.html(base_template.replace('#TEMPLATE#', scope.getTemplate()).trim());
            $compile(element.contents())(scope);

		}
	};
});