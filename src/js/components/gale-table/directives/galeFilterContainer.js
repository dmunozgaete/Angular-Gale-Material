angular.module('gale-material.components')

.directive('galeFilterContainer', function()
{
    return {
        restrict: 'E',
        scope:
        {},
        transclude: true,
        templateUrl: 'gale-table/galeFilterContainer.tpl.html',
        controller: function($scope, $element, $interpolate, $compile)
        {
            $scope.openMenu = function($mdOpenMenu, ev)
            {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };
        },

        link: function(scope, element, attrs, ctrl) {}
    };
});
