define(['algo/angular_modules'], function(modules){
  modules.directive('ngAutocomplete', function ($templateCache, $compile, $timeout) {
    return {
      restrict: 'AE',
      scope: {
        retrievalMethod: '&',
        model: '='
      },
      link: function (scope, element, attrs) {

        var display_property = attrs.displayProperty;
        var advanced_display = attrs.advancedDisplay;
        var max_results = attrs.maxResults;
        var min_length = parseInt(attrs.minLength) || 1;

        var embedded_template_element = element[0].querySelector('.template');
        var embedded_template = embedded_template_element != null ? embedded_template_element.innerHTML : null;

        scope.getTemplate = function () {
          if (display_property != undefined) {
            return '{{ item["' + display_property + '"] }}';
          } else if (advanced_display != undefined) {
            return $templateCache.get(advanced_display);
          } else if (embedded_template != null) {
            return embedded_template;
          } else {
            return '{{ item }}';
          }
        };

        scope.onBlur = function () {
          $timeout(function () {
            scope.focused = false;
          }, 200);
        };

        scope.onFocus = function () {
          scope.focused = true;
        };

        var retrieve_list = function (newVal, oldVal) {
          return !(oldVal == undefined && newVal == undefined)
            && newVal !== '' && newVal.length >= min_length;
        };

        var filterList = function (itemToFilter, list) {
          var newList = list;
          var matches = newList.filter(function (item) { return JSON.stringify(item.id) === JSON.stringify(itemToFilter.id) });
          if (matches.length == 1) {
            var index = $.inArray(matches[0], newList);
            newList.splice(index, 1);
          }

          return newList;
        };

        scope.$watch('ngModel', function (newVal, oldVal) {
          if (retrieve_list(newVal, oldVal)) {
            retrieveItems();
          } else {
            scope.items = [];
          }
        });

        var retrieveItems = function () {
          scope.retrievalMethod()(scope.ngModel, max_results)
            .then(function (data) {
              var allResults = data.data;
              $.each(scope.model, function (index, result) {
                filterList(result, allResults);
              });
              scope.items = allResults;
            });
        };

        scope.itemSelected = function (item) {
          scope.model.push(item);
          retrieveItems();
        };

        scope.remove = function (index) {
          scope.model.splice(index, 1);
          retrieveItems();
        };

        var baseTemplate = '<div class="ac-wrapper" style="width:inherit">' +
          '    <input type="text" style="width:inherit" ng-model="ngModel" ng-blur="onBlur()" ng-focus="onFocus()" />' +
          '    <div class="ac-items" style="width:inherit; position: absolute; z-index: 1000;" ng-show="focused">' +
          '       <div class="ac-item" style="width:inherit" ng-click="itemSelected(item)" ng-repeat="item in items">' +
          scope.getTemplate() +
          '        </div>' +
          '    </div>' +
          '    <div class="ac-selected-items">' +
          '       <div class="ac-selected-item" ng-repeat="item in model">' + scope.getTemplate() + '<a class="ac-selected-item-remove" ng-click="remove($index)">Remove</a></div>' +
          '    </div>' +
          '</div>';

        element.html(baseTemplate.replace('#TEMPLATE#', scope.getTemplate()).trim());
        $compile(element.contents())(scope);

      }
    };
  });
});
