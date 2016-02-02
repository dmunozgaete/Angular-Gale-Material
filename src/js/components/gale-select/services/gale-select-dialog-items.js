/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')
.directive('galeCollectionDialogItems', function($compile)
{
    return {
        restrict: 'E',
        template: '<md-list></md-list>',
        compile: function()
        {
            return {             
                pre: function(scope, element, attrs, controller, transcludeFn)
                {

                    //---------------------------------------------------
                    // Bind Template Html
                    var config = scope.config;
                    var template = null;
                    if (config.template)
                    {
                        template = config.template;
                    }
                    else
                    {
                        template = '<div class="md-list-item-text">{{' + config.itemText + '}}</div>';
                    }

                    var fragment = [
                        "<md-list-item ng-click='select(item)' ng-repeat='item in data.collection'>",
                        template,
                        "</md-list-item>"
                    ].join("");

                    //First md-list 
                    element.find("md-list").append($compile(fragment)(scope));
                    //---------------------------------------------------


                }         
            };
        },
        controller: function($scope, $element, $compile, $mdDialog)
        {

            //---------------------------------------------------
            // Bind Template Html
            $scope.select = function(item)
            {
                $mdDialog.hide(item);
            };

            $scope.cancel = function()
            {
                $mdDialog.hide(null);
            };
            //---------------------------------------------------

        }
    };
});
