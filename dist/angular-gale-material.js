/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Angular Material Components for Angular Gale
 Github:            https://github.com/dmunozgaete/angular-gale-material

 Versión:           1.0.0-rc.1
 Build Date:        2016-02-02 16:27:53
------------------------------------------------------*/

angular.module('gale-material.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("gale-datepicker/gale-datepicker-dialog.tpl.html",
    "<md-dialog aria-label=dd class=\"gale-datepicker-dialog {{config.classToAdd}}\"><md-dialog-content><div layout=row><div flex class=\"md-primary background resume\" layout=column><div class=day flex=initial>{{data.selected | amDateFormat: 'dddd'}}</div><div flex layout=column layout-align=\"center center\" layout-fill><div class=month>{{data.selected | amDateFormat: 'MMMM'}}</div><div class=day>{{data.selected | amDateFormat: 'D'}}</div><div class=year>{{data.selected | amDateFormat: 'YYYY'}}</div></div></div><div flex layout=column><div class=header flex=initial layout=row layout-align=\"center center\"><div flex=15 layout=row layout-align=\"center center\"><md-icon ng-click=previousMonth(data.selected); md-svg-icon=navigation:chevron_left class=\"md-primary text\"></md-icon></div><div flex layout=row layout-align=\"center center\" class=month>{{data.selected | amDateFormat: 'MMMM YYYY'}}</div><div flex=15 layout=row layout-align=\"center center\"><md-icon ng-click=nextMonth(data.selected); md-svg-icon=navigation:chevron_right class=\"md-primary text\"></md-icon></div></div><md-calendar ng-model=data.selected></md-calendar></div></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button class=md-accent ng-click=today()>Hoy</md-button><span flex></span><md-button type=button ng-click=cancel()>Cancelar</md-button><md-button type=button class=\"md-raised md-primary\" ng-click=save(data.selected)>Aceptar</md-button></md-dialog-actions></md-dialog>");
  $templateCache.put("gale-datepicker/gale-datepicker.tpl.html",
    "<input readonly ng-disabled=disabled ng-if=!data.displayValue ng-click=show()> <input readonly ng-disabled=disabled ng-if=data.displayValue value={{data.displayValue}} ng-click=show()>");
  $templateCache.put("gale-finder/directives/galeFinder.tpl.html",
    "<div class=finder><div class=\"close md-primary background\" ng-click=close()><md-icon md-svg-icon=navigation:close></md-icon></div><table><tr><td class=icon><md-icon md-svg-icon=action:search></md-icon></td><td class=box><input ng-change=search(query) ng-model=query placeholder=\"{{placeholder}}\"></td></tr></table><div ng-if=results class=results><div ng-repeat=\"item in results\" ng-click=select(item) layout=row ng-mouseenter=\"activeIndex = $index\" ng-mouseleave=\"activeIndex = -1\" ng-class=\"{'active': $index == activeIndex}\" layout-align=\"start center\"><div flex=5 class=icon><div class=thumb><img ng-src=\"{{item.icon}}\"></div></div><div flex class=name>{{item.name}}<div class=type>{{item.type}}</div></div></div></div><div ng-if=\"results && results.length > 0\" class=footer>{{results.length}} resultados</div></div>");
  $templateCache.put("gale-loading/directives/galeLoading.tpl.html",
    "<gale-center class=\"layout-row layout-align-start-center\"><md-progress-circular class=md-hue-2 md-mode=indeterminate></md-progress-circular><gale-text></gale-text></gale-center>");
  $templateCache.put("gale-select/gale-collection-dialog.tpl.html",
    "<md-dialog aria-label=dd class=\"gale-collection-dialog {{config.classToAdd}}\"><md-toolbar><div class=md-toolbar-tools><h2>{{config.title}}</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=content:clear aria-label=Cancelar></md-icon></md-button></div></md-toolbar><md-dialog-content><center ng-if=!data.collection><br><br><br><md-progress-circular md-mode=indeterminate></md-progress-circular><flex-loading layout-fill title=\"Cargando Colección... \" legend=\"espera..., solo un poco mas\"></flex-loading></center><gale-collection-dialog-items></gale-collection-dialog-items></md-dialog-content><md-dialog-actions layout=row><span flex ng-if=data.collection>{{data.collection.length}} items disponibles</span><md-button type=button ng-click=cancel()>Cancelar</md-button></md-dialog-actions></md-dialog>");
  $templateCache.put("gale-select/gale-select.tpl.html",
    "<input readonly ng-disabled=disabled ng-if=!data.displayValue ng-click=show()> <input readonly ng-disabled=disabled ng-if=data.displayValue value={{data.displayValue}} ng-click=show()><md-icon ng-if=!disabled md-svg-icon=navigation:arrow_drop_down class=\"md-primary text\"></md-icon><select-template ng-transclude></select-template>");
  $templateCache.put("gale-table/galeFilterContainer.tpl.html",
    "<md-menu><md-button aria-label=filter class=md-icon-button ng-click=\"openMenu($mdOpenMenu, $event)\"><md-icon md-menu-origin md-svg-icon=content:filter_list></md-icon></md-button><md-menu-content width=4 class=\"gale-filter-container popup\" ng-transclude></md-menu-content></md-menu>");
  $templateCache.put("gale-table/galeTable.tpl.html",
    "<gale-header class=gale-header layout=row layout-align=\"start center\" ng-transclude></gale-header><div class=loading ng-if=isLoading><md-progress-linear md-mode=indeterminate></md-progress-linear></div><gale-body class=gale-body><gale-row layout=row class=gale-row ng-click=onRowClick(item) layout-align=\"start center\" ng-repeat=\"item in source track by $index\" x={{$index}}><gale-cell ng-repeat=\"formatter in $$formatters\" class=gale-cell y={{$index}}></gale-cell></gale-row></gale-body><gale-empty class=gale-empty layout=column layout-align=\"center center\"></gale-empty><gale-pagination ng-if=\"pagination && getTotalRows()>0\"><div><span>{{from() | number:0}} - {{to() | number:0}} to {{getTotalRows() | number:0}}</span></div><div><md-icon ng-click=previousPage() ng-show=hasPrevious() md-svg-icon=hardware:keyboard_arrow_left></md-icon></div><div><md-icon ng-click=nextPage() ng-show=hasNext() md-svg-icon=hardware:keyboard_arrow_right></md-icon></div></gale-pagination>");
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
;/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom DatePicker Dialog Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')

.directive('galeDatepicker', ['$interpolate', function($interpolate)
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
        controller: ['$scope', '$element', '$galeDatepickerDialog', '$q', function($scope, $element, $galeDatepickerDialog, $q)
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



        }]
    };
}]);;/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       DatePicker Dialog Controller
------------------------------------------------------*/
(function()
{
    angular.module('gale-material.components')
        .controller('GaleDatepickerDialogController', ['$scope', '$log', '$timeout', '$q', 'config', '$mdDialog', function(
            $scope,
            $log,
            $timeout,
            $q,
            config,
            $mdDialog
        )
        {
            //---------------------------------------------------
            // Model
            $scope.config = config;
            $scope.data = {
                selected: null
            };


            //Find Selected date (Binding via ngModel)

            $scope.data.selected = config.selected || (new Date());

            $scope.nextMonth = function(date)
            {
                $scope.data.selected = moment(date).add(1, "month").toDate();
            };

            $scope.previousMonth = function(date)
            {
                $scope.data.selected = moment(date).subtract(1, "month").toDate();
            };

            $scope.today = function(date)
            {
                $scope.data.selected = new Date();
            };

            $scope.save = function(date)
            {
                $mdDialog.hide(date);
            };

            $scope.cancel = function()
            {
                $mdDialog.hide();
            };
        }]);

    // SERVICE
    angular.module('gale-material.components')
        .provider('$galeDatepickerDialog', function()
        {
            var $ref = this;

            this.$get = ['$log', '$q', '$mdDialog', function($log, $q, $mdDialog)
            {
                var self = {};

                //ADD NEW FACTORY
                self.show = function(ev, config)
                {
                    var deferred = $q.defer();
                    $mdDialog.show(
                        {
                            controller: 'GaleDatepickerDialogController',
                            templateUrl: 'gale-datepicker/gale-datepicker-dialog.tpl.html',
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            focusOnOpen: false,
                            locals:
                            {
                                config: config
                            }
                        })
                        .then(function(data)
                        {
                            deferred.resolve(data);
                        }, function()
                        {
                            deferred.reject();
                        });

                    return deferred.promise;
                };

                return self;
            }];
        });
})();
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
});;/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')

.directive('galeSelect', ['$interpolate', function($interpolate)
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
        controller: ['$scope', '$element', '$galeCollectionDialog', '$q', function($scope, $element, $galeCollectionDialog, $q)
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



        }]
    };
}]);
;    /*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Collection Dialog Controller
------------------------------------------------------*/
(function()
{

    // SERVICE
    angular.module('gale-material.components')
        .provider('$galeCollectionDialog', function()
        {
            var $ref = this;

            this.$get = ['$log', '$q', '$mdDialog', function($log, $q, $mdDialog)
            {
                var self = {};

                //ADD NEW FACTORY
                self.show = function(ev, config)
                {
                    var deferred = $q.defer();
                    $mdDialog.show(
                        {
                            controller: 'GaleCollectionDialogController',
                            templateUrl: 'gale-select/gale-collection-dialog.tpl.html',
                            targetEvent: ev,
                            clickOutsideToClose: true,
                            focusOnOpen: false,
                            locals:
                            {
                                config: config
                            }
                        })
                        .then(function(data)
                        {
                            deferred.resolve(data);
                        }, function()
                        {
                            deferred.reject();
                        });

                    return deferred.promise;
                };

                return self;
            }];
        });

    angular.module('gale-material.components')
        .controller('GaleCollectionDialogController', ['$scope', '$log', '$timeout', '$q', 'config', function(
            $scope,
            $log,
            $timeout,
            $q,
            config
        )
        {
            //---------------------------------------------------
            // Model
            $scope.config = config;
            $scope.data = {
                selected: null
            };

            var defer = $q.defer();
            defer.promise.then(function(items)
            {
                $scope.data.collection = items;

                //Find Selected in the collection (Binding via ngModel)
                if (config.selected)
                {
                    $scope.data.selected = config.selected;
                }
            });

            //Check Data if Array or Promise
            var collection = config.collection();
            if (collection && angular.isArray(collection))
            {
                //Smooth Delay
                var delay = $timeout(function()
                {
                    // ARRAY
                    defer.resolve(collection);
                    $timeout.cancel(delay);
                }, 350);
            }
            else if (collection && collection.then)
            {
                //is Promise
                collection.then(function(collection)
                {
                    defer.resolve(collection);
                }, function(err)
                {
                    $log.error(err);
                    defer.reject();
                });
            }
            else
            {
                throw {
                    error: "GALE_COLLECTION_DIALOG: ITEMS_MUST_BE_ARRAY_OR_PROMISE"
                };
            }
        }]);


})();
;/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       Custom Select Directive
 Github:            https://github.com/dmunozgaete/angular-gale

 Versión:           1.0.0-rc.1
 Build Date:        2016-01-22 3:20:29
------------------------------------------------------*/

angular.module('gale-material.components')
.directive('galeCollectionDialogItems', ['$compile', function($compile)
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
        controller: ['$scope', '$element', '$compile', '$mdDialog', function($scope, $element, $compile, $mdDialog)
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

        }]
    };
}]);
;angular.module('gale-material.components')

.directive('galeCell', function()
{
    return {
        restrict: 'E',
        require: '^galeRow',
        controller: ['$scope', '$element', '$attrs', '$interpolate', '$compile', function($scope, $element, $attrs, $interpolate, $compile)
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

        }],
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
;angular.module('gale-material.components')

.directive('galeColumn', ['$compile', function($compile)
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

        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

        }],

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
}]);
;angular.module('gale-material.components')

.directive('galeFilterContainer', function()
{
    return {
        restrict: 'E',
        scope:
        {},
        transclude: true,
        templateUrl: 'gale-table/galeFilterContainer.tpl.html',
        controller: ['$scope', '$element', '$interpolate', '$compile', function($scope, $element, $interpolate, $compile)
        {
            $scope.openMenu = function($mdOpenMenu, ev)
            {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };
        }],

        link: function(scope, element, attrs, ctrl) {}
    };
});
;angular.module('gale-material.components')

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

.directive('galeRow', ['$compile', '$interpolate', function($compile, $interpolate)
{
    return {
        restrict: 'E',
        require: ['^galeTable', 'galeRow'],
        controller: ['$scope', '$element', '$attrs', '$interpolate', '$compile', function($scope, $element, $attrs, $interpolate, $compile) {

        }],
        link: function(scope, element, attrs, ctrls)
        {
            var galeTableController = ctrls[0];
            var thisControler = ctrls[1];
            
            thisControler.getTableController = function()
            {
                return galeTableController;
            };

        }
    };
}]);
;angular.module('gale-material.components')

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
        controller: ['$scope', '$element', '$Api', '$galeTable', 'QueryableBuilder', function($scope, $element,$Api, $galeTable, QueryableBuilder)
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
                configuration = cfg ||
                {}; //Save current configuration

                pager = self.bind(endpoint);
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
