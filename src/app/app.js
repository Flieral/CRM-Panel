'use strict';

angular.module('BlurAdmin', [
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.select',
    'ui.router',
    '720kb.tooltips',
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
    'utils.httpWrapperPublisher',
    'utils.httpWrapperAnnouncer',
    'utils.confirmModal',
    'utils.filters'
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