/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Angular Material Components for Angular Gale
 Github:            https://github.com/dmunozgaete/angular-gale-material

 Versión:           1.0.0-rc.1
 Build Date:        2015-10-22 1:21:12
------------------------------------------------------*/

angular.module('gale-material.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("gale-finder/directives/galeFinder.tpl.html",
    "<div class=finder><div class=\"close md-primary background\" ng-click=close()><md-icon md-svg-icon=navigation:close></md-icon></div><table><tr><td class=icon><md-icon md-svg-icon=action:search></md-icon></td><td class=box><input ng-change=search(query) ng-model=query placeholder=\"{{placeholder}}\"></td></tr></table><div ng-if=results class=results><div ng-repeat=\"item in results\" ng-click=select(item) layout=row ng-mouseenter=\"activeIndex = $index\" ng-mouseleave=\"activeIndex = -1\" ng-class=\"{'active': $index == activeIndex}\" layout-align=\"start center\"><div flex=5 class=icon><div class=thumb><img ng-src=\"{{item.icon}}\"></div></div><div flex class=name>{{item.name}}<div class=type>{{item.type}}</div></div></div></div><div ng-if=\"results && results.length > 0\" class=footer>{{results.length}} resultados</div></div>");
  $templateCache.put("gale-loading/directives/galeLoading.tpl.html",
    "<gale-center class=\"layout-row layout-align-start-center\"><md-progress-circular class=md-hue-2 md-mode=indeterminate></md-progress-circular><gale-text></gale-text></gale-center>");
  $templateCache.put("gale-table/directives/galeTable.tpl.html",
    "<gale-header class=gale-header layout=row layout-align=\"start center\" ng-transclude></gale-header><div class=loading ng-if=isLoading><md-progress-linear md-mode=indeterminate></md-progress-linear></div><gale-body class=gale-body><gale-row layout=row class=gale-row ng-click=onRowClick(item) layout-align=\"start center\" ng-repeat=\"item in source\" x={{$index}} formatters=$$formatters item=item></gale-row></gale-body><gale-empty class=gale-empty layout=column layout-align=\"center center\"></gale-empty>");
}]);
;angular.manifiest('gale-material', [
    'gale-material.templates',
    'gale-material.components'
], [
    'gale',      //ANGULAR GALE CORE LIBRARY
    'ngMaterial' //MATERIAL DESIGN DIRECTIVES
])

//------------------------------------------------------------
//ADD DEFAULT THEME STYLE'S in DOM Selected By Angular-Material
//Example Use:
//  <div class="md-primary text"         --> Change the color to primary palette
//  <div class="md-primary background"   --> Change the background color to primary palette
.config(['$mdThemingProvider', function($mdThemingProvider)
{
    setTimeout(function()
    {
        //------------------------------------------------------------
        var toRGB = function(color)
        {
            if (color.value)    //Array Format
            {
                color = color.value;
                return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
            }
            else
            {
                return color;
            }
        };
        //------------------------------------------------------------
        var style = angular.element('<style></style>');
        document.head.appendChild(style[0]);
        stylesheet = style[0].sheet;

        var defaultTheme = (function()
        {
            for (var name in $mdThemingProvider._THEMES)
            {
                return name;
            }
        })();

        var palettes = ["primary", "accent", "warn"];
        for (var i in palettes)
        {
            var theme = palettes[i];
            var palette = $mdThemingProvider._THEMES[defaultTheme].colors[theme].name;
            var color = $mdThemingProvider._PALETTES[palette][500]; //Default color is 500

            stylesheet.insertRule(".md-" + theme + ".text { color: " + toRGB(color) + " }", 0);
            stylesheet.insertRule(".md-" + theme + ".background { background-color: " + toRGB(color) + " }", 0);
        }
        //------------------------------------------------------------

    }, 100);
}]);
;angular.module('gale-material.components')

.directive('galeFinder', function() {
    return {
        restrict: 'E',
        scope: {
            onSearch:       '=',    // Search Function,
            onSelect:       '=',    // Select Function,
            placeholder:    '@',    // Placeholder
            minLength:      '@',    // Search Minimun Length
            blockUi:        '@'     //Block UI??
        },
        templateUrl: 'gale-finder/directives/galeFinder.tpl.html',
        controller: ['$scope', '$element', '$log', '$galeFinder', '$window', function($scope, $element, $log , $galeFinder, $window){
            var self        = {};
            var minLength   = $scope.minLength||3;
            var onSearch    = $scope.onSearch;
            var onSelect    = $scope.onSelect;
            var blockUi     = $scope.blockUi ? ($scope.blockUi === 'true' ? true : false) : true;
            var body        = angular.element(document.body);
            var blocker     = null;

            if(!onSearch){
                $log.error("undefined 'onSearch' for finder component");
            }

            if(!onSelect){
                $log.error("undefined 'onSelect' for finder component");
            }


            $scope.search = function(query){
                $scope.activeIndex = 0;
                if(query.length >= minLength){

                    // Call find Function
                    var promise = onSearch(query);
                    if( angular.isArray(promise) ){
                        $scope.results = items;
                    }else{
                        promise.then(function(items){
                            $scope.results = items;
                        });
                    }
                    

                }else{

                    $scope.results = [];

                }
            };

            $scope.select = function(item){
                var ret = onSelect(item);
                if(ret){
                    self.hide();
                }
            };

            $scope.close = function(){
                self.hide();
            };

            //-------------------------------------------------
            //--[ GLOBAL FUNCTION'S
            self.hide = function(){
                $element.removeClass("show");

                //RESET
                $scope.query ="";
                $scope.results = [];
                $scope.activeIndex = 0;

                //BLOCKER
                if(blocker){
                    blocker.remove();
                }
            };

            self.show = function(){
                if(blockUi){
                    blocker =  angular.element('<md-backdrop class="md-sidenav-backdrop md-opaque ng-scope md-default-theme"></md-backdrop>');
                    body.append(blocker);
                }

                $element.addClass("show");
                $element.find("input").focus();

            };
            //-------------------------------------------------
           
            //-------------------------------------------------
            //Register for Service Interaction
            $galeFinder.$$register(self);  

            //Garbage Collector Destroy
            $scope.$on('$destroy', function() {
                $galeFinder.$$unregister();      //UnRegister for Service Interaction
            });
            //-------------------------------------------------
            
            //-------------------------------------------------
            // UI KEY Navigation
            var keys = [];
            keys.push({ code: 13, action: function() {
                
                if($scope.results.length>0 && $scope.activeIndex >= 0){
                    var item = $scope.results[$scope.activeIndex];
                    $scope.select(item);
                }

            }});
            keys.push({ code: 38, action: function() { 
                $scope.activeIndex--; 
            }});
            keys.push({ code: 40, action: function() { 
                $scope.activeIndex++; 
            }});
            keys.push({ code: 27, action: function() { 
                self.hide();
            }});

            $element.bind('keydown', function( event ) {
               
               keys.forEach(function(o) {
                    if ( o.code !==  event.keyCode ) { 
                        return; 
                    }
                    o.action();
                });

               event.stopPropagation();
            });
            //-------------------------------------------------
            
        }],

        link: function (scope, element, attrs, ctrl) {

        }
    };
});
;angular.module('gale-material.components')

.factory('$galeFinder', ['$q', '$rootScope', function($q, $rootScope) {
    var self        = this;
    var _component  = null;

    var _get = function(){
        if(!_component){
            throw { 
                message: 'no finder has found' 
            };
        }
        return _component;
    };

    //Entry Point to register
    self.$$register = function(component, uniqueID){
        _component = component;
    };

    //Entry Point to register
    self.$$unregister = function(component, uniqueID){
        _component = null;
    };

    //Manual Bootstrapp
    self.show = function(){
        return _get().show();
    };

    self.hide = function(){
        return _get().hide();
    };

    return self;
}]);
;angular.module('gale-material.components')

.directive('galeCenter', function() {
    return {
        restrict: 'E',
        require: '^galeLoading',
        scope: {
        },
        controller: ['$scope', '$element', '$log', function($scope, $element, $log ){
           
        }],

        link: function (scope, element, attrs, ctrl) {
        }
    };
});
;angular.module('gale-material.components')

.directive('galeLoading', function() {
    return {
        restrict: 'E',
        scope: {
            defaultMessage:     '@'     //Default Message
        },
        templateUrl: 'gale-loading/directives/galeLoading.tpl.html',
        controller: ['$scope', '$element', '$log', '$galeLoading', function($scope, $element, $log , $galeLoading){
            var self            = {};
            var defaultMesasage = $scope.defaultMessage||"";

            //-------------------------------------------------
            //--[ GLOBAL FUNCTION'S
            self.hide = function(){
                $element.removeClass("show");
            };

            self.show = function(message){
                $element.addClass("show");
                var elm = $element.find("gale-text");
                if(message){
                    elm.html(message);
                }else{
                    elm.html(defaultMesasage);
                }
            };
            //-------------------------------------------------
           
            //-------------------------------------------------
            //Register for Service Interaction
            $galeLoading.$$register(self);  

            //Garbage Collector Destroy
            $scope.$on('$destroy', function() {
                $galeLoading.$$unregister();      //UnRegister for Service Interaction
            });
            //-------------------------------------------------
        }],

        link: function (scope, element, attrs, ctrl) {
            
            element.addClass("layout-row");
            element.addClass("layout-align-center-center");


        }
    };
});
;angular.module('gale-material.components')

.factory('$galeLoading', ['$q', '$rootScope', function($q, $rootScope)
{
    var self = this;
    var _component = null;
    var deferred = $q.defer();
    var resolved = false;

    var _get = function()
    {
        if (!_component)
        {
            throw {
                message: 'no gale-loading has found'
            };
        }
        return _component;
    };

    //Entry Point to register
    self.$$register = function(component, uniqueID)
    {
        _component = component;

        //Resolve $q
        resolved = true;
        deferred.resolve();
    };

    //Entry Point to register
    self.$$unregister = function(component, uniqueID)
    {
        _component = null;

        //Reset $q
        resolved = false;
        deferred = $q.defer();
    };

    //Manual Bootstrapp
    self.show = function(message)
    {
        //If not yet resolved, wait for the resolution before , show loading
        if (!resolved)
        {
            deferred.promise.then(function()
            {
                self.show(message);
            });
            return;
        }

        return _get().show(message);
    };

    self.hide = function()
    {
        return _get().hide();
    };

    return self;
}]);
;angular.module('gale-material.components')

.directive('galePage', function() {
    return {
        restrict: 'E',

        scope: {
            title: '@',
            onKeydown: '='
        },

        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            var $window = angular.element(window);

            //-------------------------------------------
            var onKeyDown = $scope.onKeydown;
            if(onKeyDown){
                $window.on('keydown', function( event ) {
                    onKeyDown(event, event.keyCode);
                });
            }
            //-------------------------------------------
            
            //-------------------------------------------
            //Garbage Collector Destroy
            $scope.$on('$destroy', function() {
                $window.off('keydown');
            });
            //-------------------------------------------
        }],

        link: function (scope, element, attrs) {
            scope.$emit("gale-page:title:changed", {
                title: (scope.title||" ")
            });
        }
    };
});;angular.module('gale-material.components')

.directive('galeColumn', function() {
    return {
        restrict: 'E',
        require: '^galeTable',
        scope: {
    		title         : '@',    // Column Title
            property      : '@',    // Property to Bind
            width         : '@',    // Column Width (in %)
            align         : '@'     // Text Align
        },
        transclude: true,   

        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
           
        }],

        link: function (scope, element, attrs, galeTable, $transclude) {
            element.addClass("flex" + (scope.width ? "-" + scope.width :""));
            element.addClass("gale-column");
            
            $transclude( scope, function( fragments ) {
                //--------------------------------------------------------
                //Try to get header element (CUSTOM)
                var header = _.find(fragments,function(elm){
                    return elm.nodeName.toLowerCase() === "gale-header";
                });

                if(!header){
                    header = angular.element("<div>" + (scope.title||"") + "</div>");
                }else{
                    header = angular.element(header);

                    //IF HAS NG-TEMPLATE (FIX BUG TRANSCLUDE)
                    var hscript = header.find("script");
                    if(hscript.length >0 ){
                        header = hscript;
                    }else{
                        var htemplate = header.find("template");
                        if(htemplate.length >0 ){
                            htemplate = htemplate;
                        }
                    }
                }
                
                //PROPERTY: WIDTH
                var cls = null;
                switch (scope.align){
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
                if(cls){
                    header.addClass(cls);
                }

                //Append the header 
                element.append( header );    
                //--------------------------------------------------------
                
                //--------------------------------------------------------
                //Try to get item element (CUSTOM)
                var item = _.find(fragments,function(elm){
                    return elm.nodeName.toLowerCase() === "gale-item";
                });

                if(!item){
                    var html = "";
                    if(scope.property){
                        html = "{{item." + scope.property + "}}";
                    }
                    item = angular.element("<div>" + html + "</div>");
                }else{
                    item = angular.element(item);

                    //IF HAS NG-TEMPLATE (FIX BUG TRANSCLUDE)
                    var script = item.find("script");
                    if(script.length >0 ){
                        item = script;
                    }else{
                        var template = item.find("template");
                        if(template.length >0 ){
                            item = template;
                        }
                    }
                    
                }

                //Append the item 
                galeTable.$$formatters.push({
                    property: scope.property,
                    width: scope.width,
                    align: scope.align,
                    template: item.html()
                });
                //--------------------------------------------------------
            });
        }
    };
});;angular.module('gale-material.components')

.directive('galeItem', function() {
    return {
        restrict: 'E',
        require: '^galeTable',
        compile: function (element, attrs, $transclude) {
        },
        controller: ['$scope', '$element', '$attrs', '$interpolate', '$compile', function($scope, $element, $attrs, $interpolate, $compile) {
        }]
    };
});;angular.module('gale-material.components')

.directive('galeRow', ['$compile', '$interpolate', function($compile, $interpolate) {
    return {
        restrict: 'E',
        require: '^galeTable',
        controller: ['$scope', '$element', '$attrs', '$interpolate', '$compile', function($scope, $element, $attrs, $interpolate, $compile) {
              
        }],
		link: function (scope, element, attrs , ctrl) {
            angular.forEach(scope.$$formatters, function(formatter, $index){

                var template = "<gale-cell class='gale-cell'>" + formatter.template + "</gale-cell>";
                var cell = $compile(template)(scope);

                //PROPERTY: WIDTH
                cell.addClass("flex" + (formatter.width ? "-" + formatter.width :""));

                //PROPERTY: WIDTH
                var cls = null;
                switch (formatter.align){
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
                if(cls){
                    cell.addClass(cls);
                }

                //PROPERTY: ROW INDEX
                cell.attr("y", $index);
                
                //PROPERTY: BIND ON CELL CLICK
                cell.bind("click", function(ev){
                    var $cell = angular.element(this);

                    var x = $cell.parent().attr("x");
                    var y = $cell.attr("y");
                 
                    //Cell Click    
                    ctrl.$$cellClick(ev, scope.item, y, x );

                    /*
                    ev.stopPropagation();
                    ev.preventDefault();
                    return false;
                    */
                });
            
                element.append(cell);
            });
		}
    };
}]);;angular.module('gale-material.components')

.directive('galeTable', function()
{
    return {
        restrict: 'E',
        scope:
        {
            paginate: '@', // Paginate the items or not??
            items: '=', // Object with contains and Array ob Object to render
            endpoint: '@', // OData Endpoint
            showHeader: '@', // Show Header in Table or Not
            rowClick: '&', // Row Click Handler
            cellClick: '&', // Cell Click Handler
            name: '@' // gale Table Unique ID
        },
        transclude: true,
        templateUrl: 'gale-table/directives/galeTable.tpl.html',
        controller: ['$scope', '$element', '$interpolate', '$compile', '$Api', '$galeTable', 'KQLBuilder', function($scope, $element, $interpolate, $compile, $Api, $galeTable, KQLBuilder)
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

                var url = endpoint;
                if (cfg)
                {
                    url = KQLBuilder.build(url, cfg);
                }

                configuration = cfg ||
                {}; //Save current configuration

                self.bind(url);
            };

            //Bind to Endpoint
            self.bind = function(endpoint)
            {
                $scope.isLoading = true;

                $Api.invoke('GET', endpoint, null, configuration.headers)
                    .success(function(data)
                    {

                        self.render(data, true);
                        self.$fire("load-complete", [data, unique_id]);

                    })
                    .finally(function()
                    {
                        $scope.isLoading = false;
                    });
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
                    $element.find("gale-empty").append(
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


            //Register for Service Interaction
            $galeTable.$$register(self, unique_id);
        }],

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
;angular.module('gale-material.components')

.factory('$galeTable', ['$q', '$rootScope', function($q, $rootScope) {
    var self        = this;
    var components  = {};
    var callbacks   = [];
    
    //Entry Point to register
    var $$register = function(component, uniqueID){
        components[uniqueID] = component;
        
        //Call all then function registered
        angular.forEach(callbacks, function(callback){
            callback(component, uniqueID);
        });
    };

    //Entry Point to register
    var $$unregister = function(uniqueID){
        delete components[uniqueID];
        callbacks = [];
    };

    var _getByHandle = function(uniqueID){
        var identifier =  uniqueID;

        if(!identifier){
            var count = Object.keys(components).length;
            if(count === 0){
                throw { 
                    message: 'no galeTable has instantied in the view' 
                };
            }

            if(count > 1){
                throw { 
                    message: 'when you have more than 1 galetable in view, you must send the uniqueID' 
                };
            }else{
                identifier = (function() { 
                    for (var id in components){
                        return id;
                    }
                })();
                    
            }
        }

        var component = components[identifier];
        if(!component){
            throw { 
                message: 'no galeTable has found with id {0}'.format([identifier]) 
            };
        }
        return component;
    };

    //Get Registered Component's
    self.getRegisteredTables = function(){
        return components;
    };

    //Call to directive endpoint
    self.endpoint = function(value, uniqueID){
        return _getByHandle(uniqueID).endpoint(value);
    };

    //Manual Bootstrapp
    self.setup = function(endpoint, cfg, uniqueID){
        return _getByHandle(uniqueID).setup(endpoint, cfg);
    };

    self.$on = function(eventName, callback, uniqueID){
        var component = _getByHandle(uniqueID);
        component.$on(eventName, callback);   //
    };

    self.then = function(callback){
        callbacks.push(callback);
    };

    self.$$register = $$register;
    self.$$unregister = $$unregister;

    return self;
}]);
