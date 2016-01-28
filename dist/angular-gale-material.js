/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Angular Material Components for Angular Gale
 Github:            https://github.com/dmunozgaete/angular-gale-material

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:18:26
------------------------------------------------------*/

angular.module('gale-material.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("gale-finder/directives/galeFinder.tpl.html",
    "<div class=finder><div class=\"close md-primary background\" ng-click=close()><md-icon md-svg-icon=navigation:close></md-icon></div><table><tr><td class=icon><md-icon md-svg-icon=action:search></md-icon></td><td class=box><input ng-change=search(query) ng-model=query placeholder=\"{{placeholder}}\"></td></tr></table><div ng-if=results class=results><div ng-repeat=\"item in results\" ng-click=select(item) layout=row ng-mouseenter=\"activeIndex = $index\" ng-mouseleave=\"activeIndex = -1\" ng-class=\"{'active': $index == activeIndex}\" layout-align=\"start center\"><div flex=5 class=icon><div class=thumb><img ng-src=\"{{item.icon}}\"></div></div><div flex class=name>{{item.name}}<div class=type>{{item.type}}</div></div></div></div><div ng-if=\"results && results.length > 0\" class=footer>{{results.length}} resultados</div></div>");
  $templateCache.put("gale-loading/directives/galeLoading.tpl.html",
    "<gale-center class=\"layout-row layout-align-start-center\"><md-progress-circular class=md-hue-2 md-mode=indeterminate></md-progress-circular><gale-text></gale-text></gale-center>");
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
});