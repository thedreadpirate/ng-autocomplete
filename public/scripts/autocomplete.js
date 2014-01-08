angular.module('ngAutocompleteModule', []).
directive('ngAutocomplete', function($templateCache, $compile, $timeout){
	return {
		restrict: 'EA',
		scope: {
			onSelect: '&',
			retrievalMethod: '&'
		},
		link: function(scope, element, attrs){

            var display_property = attrs.displayProperty;
            var advanced_display = attrs.advancedDisplay;
            var max_results = attrs.maxResults;
            var min_length = parseInt(attrs.minLength) || 1;

            var embedded_template_element = element[0].querySelector('.template');
            var embedded_template = embedded_template_element != null ? embedded_template_element.innerHTML : null;

            scope.getTemplate = function(){
                if(display_property != undefined){
                    return '{{ item["' + display_property + '"] }}';
                }else if(advanced_display != undefined){
                    return $templateCache.get(advanced_display);
                }else if(embedded_template != null){
                    return embedded_template;
                }else{
                    return '{{ item }}';
                }
            };

            scope.onBlur = function(){
                $timeout(function(){
                    scope.focused = false;
                }, 200);
            }

            scope.onFocus = function(){
                scope.focused = true;
            }

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

            var base_template = '<div class="ac-wrapper" style="width:inherit">' +
                                '    <input type="text" style="width:inherit" ng-model="ngModel" ng-blur="onBlur()" ng-focus="onFocus()" />' +
                                '    <div class="ac-items" style="width:inherit; position: absolute; z-index: 1000;" ng-show="focused">' +
                                '       <div class="ac-item" style="width:inherit" ng-click="itemSelected(item)" ng-repeat="item in items">' +
                                            scope.getTemplate() +
                                '        </div>' +
                                '    </div>' +
                                '</div>';


            element.html(base_template.replace('#TEMPLATE#', scope.getTemplate()).trim());
            $compile(element.contents())(scope);

		}
	};
});