'use strict';

angular.module('BlurAdmin', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'ngCookies',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    // 'ngJsTree',
    'angular-progress-button-styles',
    'BlurAdmin.theme',
    'BlurAdmin.pages',
    'utils.apiUrls',
    'utils.notification',
    'utils.httpWrapper',
    'utils.confirmModal'
]).config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(function($q) {
        return {
            'responseError': function(rejection){
                var defer = $q.defer();
                if(rejection.status == 401){
                    console.log("401");
                }
                defer.reject(rejection);
                return defer.promise;
            }
        };
    });

}]);