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

    function publisherControllerFunction($uibModal, $scope, $rootScope, notificationService, httpWrapper, UrlConstants, confirmModal) {
        var vm = this;
        $scope.model = {};
        vm.selection = {};
        httpWrapper.get(UrlConstants.clientsApi).success(function (response) {
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
            httpWrapper.get(UrlConstants.clientsApi + client.id + '/applications').success(function (response) {
                vm.clientsApplications = response;
                vm.selection.application = null;
                vm.selection.placement = null;
                $scope.model.selectedTab = 1;
                // vm.campaignsSubcampaign = [];
            })
        };

    }
})();
