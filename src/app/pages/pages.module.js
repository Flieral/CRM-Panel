/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        'BlurAdmin.pages.login',
        'BlurAdmin.pages.dashboard',
        'BlurAdmin.pages.publisher'
     /*   'BlurAdmin.pages.search',
        'BlurAdmin.pages.tables',
        'BlurAdmin.pages.ui',
        'BlurAdmin.pages.components',
        'BlurAdmin.pages.form',
        'BlurAdmin.pages.charts',
        'BlurAdmin.pages.maps',
        'BlurAdmin.pages.profile'*/
    ])
        .config(routeConfig)
        .run(runConfig)
        .constant();
    /** @ngInject */
    function runConfig($rootScope, $state, $cookies, $http, UrlConstants, notificationService, $timeout) {
        $rootScope.configs = {};
        $rootScope.access_token = {};
        $http.get('/assets/conf/country.json').success(function(response){
            $rootScope.configs.countries = response;
        });
        $http.get('/assets/conf/language.json').success(function(response){
            $rootScope.configs.languages = response;
        });
        $http.get('/assets/conf/startStyle.json').success(function(response){
            $rootScope.configs.startStyle = response;
        });
        $http.get('/assets/conf/mediaStyle.json').success(function(response){
            $rootScope.configs.mediaStyle = response;
        });
        $http.get('/assets/conf/placementStyle.json').success(function(response){
            $rootScope.configs.placementStyle = response;
        });
        $http.get('/assets/conf/subcampiagnPlan.json').success(function(response){
            $rootScope.configs.subcampaignPlan = response;
        });
        if ($cookies.get('token_an') && $cookies.get('token_pu') && $cookies.get('userId')) {
            $rootScope.access_token.announcer = $cookies.get('token_an');
            $rootScope.access_token.publisher = $cookies.get('token_pu');
            $rootScope.userId = $cookies.get('userId');
            $http.get(UrlConstants.clients.announcer + $rootScope.userId + '?access_token=' + $rootScope.access_token.announcer).success(function (response) {
                console.log(response);
                $rootScope.loggedIn = true;
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
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!$rootScope.loggedIn) {
                if (toState.name != 'login') {
                    event.preventDefault();
                    $http.get(UrlConstants.clients.announcer + $rootScope.userId + '?access_token=' + $rootScope.access_token.announcer).success(function (response) {
                        $rootScope.loggedIn = true;
                        $state.go(toState.name);
                    }).error(function (response) {
                        console.log(response);
                        notificationService.error('error', 'error');
                        $rootScope.loggedIn = false;
                        $state.go('login');
                    })
                }
            } else {
                if (toState.name == 'login') {
                    notificationService.info('You are already LoggedIn!');
                    event.preventDefault();
                    $state.go('dashboard');
                }
            }
        });
        $rootScope.convertTimestamp = function (time){
            var date = new Date(time);
            console.log(date);
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
