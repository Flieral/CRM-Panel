/**
 * @author Sajjad Shahi
 * created on 9.4.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login', [])
        .config(routeConfig)
        .controller('loginCtrl', function ($scope, $state, $rootScope, $http, UrlConstants,notificationService, $cookies, $cookieStore) {
            var vm = this;
            vm.formData = {};
            console.log($cookies.getAll());
            vm.click = function () {
                console.log(vm.formData);
                $http.post(UrlConstants.login, vm.formData).success(function (response) {
                    $rootScope.loggedIn = true;
                    $state.go('dashboard');
                    $cookies.put('token', response.id);
                    $rootScope.access_token = response.id;
                    $cookies.put('userId', response.userId);
                    console.log(response);
                }).error(function (){
                    notificationService.error('Error', 'Please enter a valid email and password');
                    $rootScope.loggedIn = false;
                });
            }
        });

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/login/login.html',
                title: 'null',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            });
    }

})();
