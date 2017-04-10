/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        'BlurAdmin.pages.login',
        'BlurAdmin.pages.dashboard'
        /*'BlurAdmin.pages.ui',
        'BlurAdmin.pages.components',
        'BlurAdmin.pages.form',
        'BlurAdmin.pages.tables',
        'BlurAdmin.pages.charts',
        'BlurAdmin.pages.maps',
        'BlurAdmin.pages.profile'*/
    ])
        .config(routeConfig)
        .run(runConfig)
        .constant();
    /** @ngInject */
    function runConfig($rootScope, $state, $cookies, $http, UrlConstants, notificationService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.loggedIn) {
                if (toState.name != 'login') {
                    event.preventDefault();
                    $state.go('login');
                }
            } else {
                if (toState.name == 'login') {
                    notificationService.info('You are already LoggedIn!');
                    event.preventDefault();
                    $state.go('dashboard');
                }
            }
        });
        if ($cookies.get('token') && $cookies.get('userId')) {
            $rootScope.access_token = $cookies.get('token');
            $rootScope.userId = $cookies.get('userId');
            $http.get(UrlConstants.heartBeat + $rootScope.userId + '?access_token=' + $rootScope.access_token).success(function (response) {
                console.log(response);
                notificationService.success('success', 'success');
                $rootScope.loggedIn = true;
                $state.go('dashboard');
            }).error(function (response) {
                console.log(response);
                notificationService.error('error', 'error');
                $rootScope.loggedIn = false;
                $state.go('login');
            })
        } else {
            $rootScope.loggedIn = false;
            $state.go('login');
        }
    }

    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        // $urlRouterProvider.otherwise('/dashboard');
        /*baSidebarServiceProvider.addStaticItem({
         title: 'Pages',
         icon: 'ion-document',
         subMenu: [{
         title: 'Sign In',
         fixedHref: 'auth.html',
         blank: true
         }, {
         title: 'Sign Up',
         fixedHref: 'reg.html',
         blank: true
         }, {
         title: 'User Profile',
         stateRef: 'profile'
         }, {
         title: '404 Page',
         fixedHref: '404.html',
         blank: true
         }]
         });*/
        /*baSidebarServiceProvider.addStaticItem({
            title: 'Menu Level 1',
            icon: 'ion-ios-more',
            subMenu: [{
                title: 'Menu Level 1.1',
                disabled: true
            }, {
                title: 'Menu Level 1.2',
                subMenu: [{
                    title: 'Menu Level 1.2.1',
                    disabled: true
                }]
            }]
        });*/
    }

})();
