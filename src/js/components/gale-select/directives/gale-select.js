/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')

.directive('galeSelect', function($interpolate)
{
    return {
        restrict: 'E',
        require: ['ngModel'],
        scope:
        {
            itemText: '@', // Text Value Display
            ngModel: '=', // Ng-Model
            items: '&' // Items Expression
        },
        transclude: true,
        templateUrl: 'gale-select/gale-select.tpl.html',
        compile: function()
        {
            return {             
                post: function(scope, element, attrs, controller, transcludeFn)
                {         

                    //Check Items Exists
                    if (!angular.isDefined(attrs.items))
                    {
                        throw {
                            error: "ITEMS_NOT_DEFINED"
                        };
                    }

                    //Watch Disabled Attr (and ng-disabled too)
                    attrs.$observe('disabled', function(val)
                    {
                        if (val === "")
                        {
                            val = true;
                        }
                        scope.disabled = val;
                    });


                    //Not render yet from angularJS , so , transform into a Comment Node
                    var templates = element.find("select-template");
                    templates.html("<!--" + templates.html().trim() + "-->");

                }         
            };
        },
        controller: function($scope, $element, $galeCollectionDialog, $q)
        {
            $scope.data = {
                placeholder: $scope.placeholder,
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

                //Get Template
                var templateNode = $element.find("select-template");
                var html = null;
                if (templateNode.length > 0)
                {
                    html = templateNode.html().substring(4);
                    html = html.substring(0, html.length - 4);
                }

                //DEFER
                $galeCollectionDialog.show(ev,
                {
                    collection: $scope.items, //Can be a Function Promise
                    selected: $scope.ngModel,
                    itemText: $scope.itemText,
                    title: $scope.placeholder,
                    classToAdd: $element.attr("class"),
                    template: html
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


            //Set Placeholder Label (from the input-container, or via placeholder attr)
            //md-input-container
            var parent = $element.parent();
            if (parent.length > 0)
            {
                var label = parent.find("label");
                $scope.placeholder = label.html();
            }
            else
            {
                $scope.placeholder = $element.attr("placeholder");
            }


            //Wath For Model Change
            $scope.$watch("ngModel", function(value)
            {
                if (value)
                {
                    //Load When change (Post Compilation)
                    $scope.data.displayValue = $interpolate("{{" + $scope.itemText + "}}")(
                    {
                        item: $scope.ngModel
                    });
                }
            });



        }
    };
});
