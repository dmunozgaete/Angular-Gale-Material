angular.module('gale-material.components')

.directive('galeCenter', function() {
    return {
        restrict: 'E',
        require: '^galeLoading',
        scope: {
        },
        controller: function($scope, $element, $log ){
           
        },

        link: function (scope, element, attrs, ctrl) {
        }
    };
});
