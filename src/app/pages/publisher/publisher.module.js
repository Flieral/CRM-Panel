/**
 * Created by Sajjad on 4/17/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.publisher', [])
        .config(routeConfig)
        .controller('publisherController', publisherControllerFunction);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('publisher', {
                url: '/publisher',
                templateUrl: 'app/pages/publisher/publisher.html',
                controller: 'publisherController',
                controllerAs: 'vm',
                title: 'Publisher',
                sidebarMeta: {
                    icon: 'ion-android-phone-portrait',
                    order: 0
                }
            });
    }

    function publisherControllerFunction($uibModal, $scope, $rootScope, notificationService, httpWrapperPu, UrlConstants, confirmModal) {
        var vm = this;
        $scope.model = {};
        vm.selection = {};
        httpWrapperPu.get(UrlConstants.clients.publisher).success(function (response) {
            vm.allClients = response;
        });
        vm.getClientsApplications = function (client) {
            for (var i = 0; i < vm.allClients.length; i++) {
                if (vm.allClients[i] != client)
                    vm.allClients[i].selected = false;
                else {
                    client.selected = true;
                    vm.selection.client = client;
                }
            }
            httpWrapperPu.get(UrlConstants.clients.publisher + client.id + '/applications').success(function (response) {
                vm.clientsApplications = response;
                vm.selection.application = null;
                vm.selection.placement = null;
                $scope.model.selectedTab = 1;
                // vm.campaignsSubcampaign = [];
            })
        };
        vm.getAppsPlacements = function (app){
            for (var i = 0; i < vm.clientsApplications.length; i++) {
                if (vm.clientsApplications [i] != app)
                    vm.clientsApplications [i].selected = false;
                else {
                    app.selected = true;
                    vm.selection.application = app;
                }
            }
            httpWrapperPu.get(UrlConstants.application + app.id + '/placements').success(function (response) {
                vm.appsPlacements = response;
                vm.selection.placement = null;
                $scope.model.selectedTab = 2;
                // vm.campaignsSubcampaign = [];
            })
        }

    }
})();
