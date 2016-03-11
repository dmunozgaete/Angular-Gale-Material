angular.module('gale-material.components')

.directive('galeTable', function()
{
    return {
        restrict: 'E',
        scope:
        {
            // PAGINATION
            pagination: '=', // Paginate the items or not??
            paginationSize: '@',

            //VARIABLES
            items: '=?', // Object with contains and Array ob Object to render
            endpoint: '@', // OData Endpoint
            showHeader: '@', // Show Header in Table or Not
            rowClick: '&', // Row Click Handler
            cellClick: '&', // Cell Click Handler
            name: '@' // gale Table Unique ID
        },
        transclude: true,
        templateUrl: 'gale-table/galeTable.tpl.html',
        controller: function($scope, $element, $Api, $galeTable, QueryableBuilder)
        {
            this.$$formatters = $scope.$$formatters = []; //Lazy Load Instantation
            var self = this; //Auto reference
            var unique_id = ($scope.name || (new Date()).getTime()); //Component Unique ID
            var configuration = {}; //Configuration if 'setup'

            //------------------------------------------------------------------------------
            // EVENT IMPLEMENTATION
            var $$listeners = {};
            self.$on = function(name, listener)
            {

                //----------------------------------------
                //If hook, via $on change the pointer to hand
                if (name === "row-click")
                {
                    $element.addClass("row-click");
                }
                //----------------------------------------

                var namedListeners = $$listeners[name];
                if (!namedListeners)
                {
                    $$listeners[name] = namedListeners = [];
                }
                namedListeners.push(listener);

                //de-register Function
                return function()
                {
                    namedListeners[indexOf(namedListeners, listener)] = null;
                };
            };

            self.hasEventHandlersFor = function(name)
            {
                return $$listeners[name] != null;
            };

            self.$fire = function(name, args)
            {
                var listeners = $$listeners[name];
                if (!listeners)
                {
                    return;
                }

                angular.forEach(listeners, function(listener)
                {
                    listener.apply(listener, args);
                });
            };
            //------------------------------------------------------------------------------

            //------------------------------------------------------------------------------
            //Retrieve the Unique Id for the gale Table
            self.getUniqueId = function()
            {
                return unique_id;
            };

            //Manual Bootstrap
            self.setup = function(endpoint, cfg)
            {
                $scope.items = [];
                
                configuration = cfg ||
                {}; //Save current configuration

                pager = self.bind(endpoint);
            };

            //Refresh Current Page if pager is enabled
            self.refresh = function(endpoint, cfg)
            {
                if (pager)
                {
                    pager.refresh();
                }
            };

            //Bind to Endpoint
            self.bind = function(endpoint)
            {
                //Pagination Variables
                var totalRows = 0;
                var offset = 0;
                var limit = parseInt(($scope.paginationSize || 10));

                var fetch = function()
                {
                    var url = endpoint;
                    var data = {};

                    if ($scope.pagination)
                    {
                        //ODATA Conventions
                        data = {
                            "$offset": offset,
                            "$limit": limit
                        };
                    }
                    $scope.isLoading = true;


                    // Get Data from Server (POST)
                    var request = $Api.invoke('GET', url, data, configuration.headers);

                    request
                        .success(function(data)
                        {
                            //UPDATE OFFSET COUNTER
                            totalRows = data.total;
                            $scope.items = data.items;

                            self.render(data, true);
                            self.$fire("load-complete", [data, unique_id]);
                        })
                        .finally(function()
                        {
                            $scope.isLoading = false;
                        });

                    return request;


                };


                //------------------------------------------------------
                //Call One time (First)
                fetch();
                //------------------------------------------------------

                return {
                    nextPage: function()
                    {
                        offset += limit;
                        return fetch();
                    },
                    refresh: function()
                    {
                        $scope.items = [];
                        return fetch();
                    },
                    previousPage: function()
                    {
                        offset -= limit;
                        return fetch();
                    },
                    hasPrevious: function()
                    {
                        return offset > 0;
                    },
                    hasNext: function()
                    {
                        return totalRows > 0 && (offset + limit) < totalRows;
                    },
                    totalRows: function()
                    {
                        return totalRows;
                    },
                    offset: function()
                    {
                        return offset;
                    },
                    limit: function()
                    {
                        return limit;
                    }

                };

            };

            //Render table
            self.render = function(data, isRest)
            {
                self.$fire("before-render", [data, unique_id]);


                $scope.source = isRest ? data.items : data;
                if (isRest)
                {
                    data.total = data.items.length;
                }

                if ($scope.source.length === 0)
                {
                    //Put the empty-data placeholder into the gale-empty directive
                    $element.find("gale-empty").css("display", "block").append(
                        $element.find("gale-empty-data").css("display", "block")
                    );
                }
            };

            //------------------------------------------------------------------------------
            //Cell Click
            var cellClickHandler = $scope.cellClick();
            self.$$cellClick = function(ev, item, cellIndex, rowIndex)
            {

                //Scale to Row Click
                self.$fire("cell-click", [ev, item,
                {
                    x: rowIndex,
                    y: cellIndex
                }, self.getUniqueId()]);
            };

            //Garbage Collector Destroy
            $scope.$on('$destroy', function()
            {
                self.endpoint = null;
                $scope.source = null;

                $galeTable.$$unregister(self, unique_id); //UnRegister for Service Interaction
            });


            //------------------------------------------------------------------------------
            // Pagination
            var pager = null;
            $scope.getTotalRows = function()
            {
                return pager.totalRows();
            };
            $scope.nextPage = function()
            {
                pager.nextPage();
            };
            $scope.previousPage = function()
            {
                pager.previousPage();
            };
            $scope.from = function()
            {
                return (pager.offset()) + 1;
            };
            $scope.to = function()
            {
                var value = (pager.offset() + pager.limit());
                if (value > pager.totalRows())
                {
                    return pager.totalRows();
                }
                return value;
            };
            $scope.hasNext = function()
            {
                if (!pager)
                {
                    return false;
                }
                return pager.hasNext();
            };
            $scope.hasPrevious = function()
            {
                if (!pager)
                {
                    return false;
                }
                return pager.hasPrevious();
            };
            //------------------------------------------------------------------------------

            //Register for Service Interaction
            $galeTable.$$register(self, unique_id);
        },

        link: function(scope, element, attrs, ctrl)
        {

            var rowClickHandler = scope.rowClick();

            if (scope.showHeader && !scope.$eval(scope.showHeader))
            {
                element.find("gale-header").css("display", "none");
            }

            //General Clases on gale Table
            element.attr("layout-fill", "");
            element.addClass("gale-table");

            //Watch for Changes
            scope.$watch('endpoint', function(value)
            {
                if (value)
                {
                    ctrl.bind(value);
                }
            });

            //Watch for Changes
            scope.$watch('items', function(value)
            {
                if (value)
                {
                    ctrl.render(value, false);
                }
            });

            //Add cursor if handler exists
            if (rowClickHandler || ctrl.hasEventHandlersFor("row-click"))
            {
                element.addClass("row-click");
            }

            element.find("gale-empty").css("display", "none");
            element.find("gale-empty-data").css("display", "none");

            scope.onRowClick = function(item)
            {

                //Row Click
                ctrl.$fire("row-click", [event, item, ctrl.getUniqueId()]);
                if (rowClickHandler)
                {
                    rowClickHandler(item);
                }

            };

        }
    };
});
