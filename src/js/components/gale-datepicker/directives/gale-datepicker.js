/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom DatePicker Dialog Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')

.directive('galeDatepicker', function($interpolate)
{
    return {
        restrict: 'E',
        require: ['ngModel'],
        scope:
        {
            dateFormat: '@', // Text Value Display
            ngModel: '=' // Ng-Model
        },
        transclude: true,
        templateUrl: 'gale-datepicker/gale-datepicker.tpl.html',
        compile: function()
        {
            return {             
                post: function(scope, element, attrs, controller, transcludeFn)
                {         

                    //Watch Disabled Attr (and ng-disabled too)
                    attrs.$observe('disabled', function(val)
                    {
                        if (val === "")
                        {
                            val = true;
                        }
                        scope.disabled = val;
                    });

                }         
            };
        },
        controller: function($scope, $element, $galeDatepickerDialog, $q)
        {
            $scope.data = {
                displayValue: null
            };

            var focusedClass = "md-input-focused";
            $scope.show = function(ev)
            {
                if ($scope.disabled)
                {
                    return;
                }

                var inputContainer = $element.parent();
                inputContainer.addClass(focusedClass);

                //DEFER
                $galeDatepickerDialog.show(ev,
                {
                    selected: $scope.ngModel,
                    classToAdd: $element.attr("class")
                }).then(function(data)
                {
                    // Set
                    if (data)
                    {
                        $scope.ngModel = data;
                    }

                    inputContainer.removeClass(focusedClass);
                }, function()
                {
                    inputContainer.removeClass(focusedClass);
                });

            };

            //DATE FORMAT
            if (!$scope.dateFormat)
            {
                $scope.dateFormat = "L";
            }
            var displayValueFormat = "{{ item | amDateFormat:'" + $scope.dateFormat + "' }}";

            //HAS VALUE??
            $scope.$watch("ngModel", function(value)
            {
                if (value)
                {
                    if (!angular.isDate(value))
                    {
                        $scope.ngModel = moment(value).toDate();
                        return;
                    }

                    //Load When change (Post Compilation)
                    $scope.data.displayValue = $interpolate(displayValueFormat)(
                    {
                        item: $scope.ngModel
                    });
                }
                else
                {
                    //md-input-container
                    $element.parent().removeClass("md-input-has-placeholder");
                }
            });



        }
    };
});