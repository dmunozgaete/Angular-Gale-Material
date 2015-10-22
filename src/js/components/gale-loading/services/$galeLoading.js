angular.module('gale-material.components')

.factory('$galeLoading', function($q, $rootScope)
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
});
