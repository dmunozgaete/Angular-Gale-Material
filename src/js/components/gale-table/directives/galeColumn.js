angular.module('gale-material.components')

.directive('galeColumn', function($compile)
{
    return {
        restrict: 'E',
        require: '^galeTable',
        scope:
        {
            title: '@', // Column Title
            property: '@', // Property to Bind
            width: '@', // Column Width (in %)
            filterable: '=', // Can be Filter???
            filterableType: '=', // Filter Type to show?
            align: '@' // Text Align
        },
        transclude: true,

        controller: function($scope, $element, $attrs) {

        },

        link: function(scope, element, attrs, galeTable, $transclude)
        {
            element.addClass("flex" + (scope.width ? "-" + scope.width : ""));
            element.addClass("gale-column");

            $transclude(scope, function(fragments)
            {
                //--------------------------------------------------------
                //Try to get header element (CUSTOM)
                var header = _.find(fragments, function(elm)
                {
                    return elm.nodeName.toLowerCase() === "gale-header";
                });

                if (!header)
                {
                    header = angular.element("<div class='header'>" + (scope.title || "") + "</div>");
                }
                else
                {
                    header = angular.element(header);

                    //IF HAS NG-TEMPLATE (FIX BUG TRANSCLUDE)
                    var hscript = header.find("script");
                    if (hscript.length > 0)
                    {
                        header = hscript;
                    }
                    else
                    {
                        var htemplate = header.find("template");
                        if (htemplate.length > 0)
                        {
                            header = htemplate;
                        }
                    }

                    header = $compile("<div class='header custom'>" + header.html() + "</div>")(scope.$parent);
                }


                //PROPERTY: WIDTH
                var cls = null;
                switch (scope.align)
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
                    header.addClass(cls);
                }

                //--------------------------------------------------------
                // FILTERING! (IF ACTIVATE)
                if (scope.filterable)
                {

                    //Build the filter Box
                    var filter = angular.element("<filterable></filterable>");
                    filter.append(header);


                    //Filter Type
                    var filterType = ("text" || scope.filterableType);
                    var popup = $compile("<gale-filter-container><gale-" + filterType + "-filter/></gale-filter-container>")(scope);


                    filter.append(popup);

                    //Set the growth object
                    header = filter;
                }
                //--------------------------------------------------------

                //Append the header 
                element.append(header);

                //--------------------------------------------------------
                //Try to get item element (CUSTOM)
                var item = _.find(fragments, function(elm)
                {
                    return elm.nodeName.toLowerCase() === "gale-item";
                });

                if (!item)
                {
                    var html = "";
                    if (scope.property)
                    {
                        html = "{{item." + scope.property + "}}";
                    }
                    item = angular.element("<div>" + html + "</div>");
                }
                else
                {
                    item = angular.element(item);

                    //IF HAS NG-TEMPLATE (FIX BUG TRANSCLUDE)
                    var script = item.find("script");
                    if (script.length > 0)
                    {
                        item = script;
                    }
                    else
                    {
                        var template = item.find("template");
                        if (template.length > 0)
                        {
                            item = template;
                        }
                    }

                }

                //Append the item 
                galeTable.$$formatters.push(
                {
                    property: scope.property,
                    width: scope.width,
                    align: scope.align,
                    template: item.html()
                });
                //--------------------------------------------------------
            });
        }
    };
});
