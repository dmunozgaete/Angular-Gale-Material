angular.module('gale-material.components')

.directive('galeRow', function($compile, $interpolate)
{
    return {
        restrict: 'E',
        require: ['^galeTable', 'galeRow'],
        controller: function($scope, $element, $attrs, $interpolate, $compile) {

        },
        link: function(scope, element, attrs, ctrls)
        {
            var galeTableController = ctrls[0];
            var thisControler = ctrls[1];
            
            thisControler.getTableController = function()
            {
                return galeTableController;
            };

        }
    };
});
