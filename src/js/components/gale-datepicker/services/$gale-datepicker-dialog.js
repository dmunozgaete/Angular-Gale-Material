/*------------------------------------------------------
 Company:           Valentys Ltda.
 Author:            David Gaete <dmunozgaete@gmail.com> (https://github.com/dmunozgaete)
 
 Description:       DatePicker Dialog Controller
------------------------------------------------------*/
(function()
{
    angular.module('gale-material.components')
        .controller('GaleDatepickerDialogController', function(
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
        });

    // SERVICE
    angular.module('gale-material.components')
        .provider('$galeDatepickerDialog', function()
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
            };
        });
})();
