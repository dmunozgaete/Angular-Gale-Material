    /*------------------------------------------------------
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

            this.$get = function($log, $q, $mdDialog)
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
            };
        });

    angular.module('gale-material.components')
        .controller('GaleCollectionDialogController', function(
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
        });


})();
