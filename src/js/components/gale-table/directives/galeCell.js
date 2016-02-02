angular.module('gale-material.components')

.directive('galeCell', function()
{
    return {
        restrict: 'E',
        require: '^galeRow',
        controller: function($scope, $element, $attrs, $interpolate, $compile)
        {
            //----------------------------------------------------
            // Reference to Controller Scope
            var parentScope = $scope.$parent.$parent.$parent;
            // Create New Scope Inheriting from the parent View Controller
            var newScope = parentScope.$new();
            newScope.item = $scope.item;
            //----------------------------------------------------



            var formatter = $scope.formatter;
            var template = "<div>" + formatter.template + "</div>";
            var cell = $compile(template)(newScope);
            
            $element.append(cell);
            //----------------------------------------------------

            //PROPERTY: WIDTH
            $element.addClass("flex" + (formatter.width ? "-" + formatter.width : ""));

            //PROPERTY: WIDTH
            var cls = null;
            switch (formatter.align)
            {
                case "left":
                    cls = "alignLeft";
                    break;
                case "right":
                    cls = "alignRight";
                    break;
                case "center":
                    cls = "alignCenter";
                    break;
            }
            if (cls)
            {
                $element.addClass(cls);
            }

        },
        link: function(scope, element, attrs, ctrl)
        {

            //PROPERTY: BIND ON CELL CLICK
            element.bind("click", function(ev)
            {
                var $cell = angular.element(this);

                var x = $cell.parent().attr("x");
                var y = $cell.attr("y");

                //Cell Click    
                ctrl.getTableController().$$cellClick(ev, scope.item, y, x);
            });

        }
    };
});
