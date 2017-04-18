/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard', [])
        .config(routeConfig)
        .controller('dashboardController', dashboardControllerFunction);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                controller: 'dashboardController',
                controllerAs: 'vm',
                title: 'Dashboard',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0
                }
            });
    }

    function dashboardControllerFunction($uibModal, $scope, $rootScope, notificationService, httpWrapper, UrlConstants, confirmModal) {
        var vm = this;
        vm.selection = {};
        $scope.model = {};
        httpWrapper.get(UrlConstants.clientsApi).success(function (response) {
            vm.allClients = response;
        });
        vm.getClientsCampaign = function (client) {
            for (var i = 0; i < vm.allClients.length; i++) {
                if (vm.allClients[i] != client)
                    vm.allClients[i].selected = false;
                else {
                    client.selected = true;
                    vm.selection.client = client;
                }
            }
            httpWrapper.get(UrlConstants.clientsApi + client.id + '/campaigns').success(function (response) {
                vm.clientsCampaigns = response;
                vm.selection.campaign = null;
                vm.selection.subcampaign = null;
                vm.campaignsSubcampaign = [];
                $scope.model.selectedTab = 1;
            })
        };
        vm.getCampaignsSubcampaign = function (campaign) {
            for (var i = 0; i < vm.clientsCampaigns.length; i++) {
                if (vm.clientsCampaigns[i] != campaign)
                    vm.clientsCampaigns[i].selected = 0;
                else {
                    campaign.selected = true;
                    vm.selection.campaign = campaign;
                }
            }
            httpWrapper.get(UrlConstants.campaigns + campaign.id + '/subcampaigns').success(function (response) {
                console.log(response);
                vm.campaignsSubcampaign = response;
                $scope.model.selectedTab = 2;
            })
        };
        vm.editClient = function (client) {
            $uibModal.open({
                templateUrl: 'app/pages/dashboard/modals/editClient.html',
                size: 'md',
                controllerAs: 'sh',
                controller: function ($uibModalInstance, $filter, httpWrapper, notificationService) {
                    var sh = this;
                    sh.formData = angular.copy(client);
                    sh.country = {
                        name: $filter('countryMap')(sh.formData.registrationCountry),
                        code: sh.formData.registrationCountry
                    };
                    sh.countries = $rootScope.configs.countries;
                    sh.submitForm = function () {
                        sh.formData.registrationCountry = sh.country.code;
                        httpWrapper.put(UrlConstants.clientsApi + client.id, sh.formData).success(function (){
                            notificationService.success("Success", "Editing Client was Done Successfully!");
                            client = sh.formData;
                        }).error(function (response){
                            notificationService.error(response.error.name, response.error.message);
                        })
                    };
                    sh.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                }
            })
        };
        vm.editCampaign = function (campaign) {
            $uibModal.open({
                templateUrl: 'app/pages/dashboard/modals/editCampaign.html',
                size: 'md',
                controllerAs: 'sh',
                controller: function ($uibModalInstance, $filter, httpWrapper, notificationService) {
                    var sh = this;

                }
            })
        };
        vm.removeClient = function (client) {
            confirmModal.open('Removing ' + client.username, 'Are you sure to remove the client? The action could not be undone!').then(function () {
                httpWrapper.delete(UrlConstants.clientsApi + client.id).success(function () {
                    httpWrapper.get(UrlConstants.clientsApi).success(function (response) {
                        vm.allClients = response;
                    });
                    notificationService.success('Success', 'Deleted the client successfully!');
                }).error(function () {
                    notificationService.error('Error', 'There was an error in removing the client');
                })
            })
        };
        vm.removeCampaign = function (campaign) {
            confirmModal.open('Removing ' + campaign.name, 'Are you sure to remove the campaign? The action could not be undone!').then(function () {
                httpWrapper.delete(UrlConstants.clientsApi + campaign.clientId + '/campaign/' + campaign.id).success(function () {
                    notificationService.success('Success', 'Deleted the campaign successfully!');
                }).error(function () {
                    notificationService.error('Error', 'There was an error in removing the campaign!');
                })
            })
        };
        vm.removeSubcampaign = function (subcampaign) {
            confirmModal.open('Removing ' + campaign.name, 'Are you sure to remove the campaign? The action could not be undone!').then(function () {
                httpWrapper.delete(UrlConstants.clientsApi + client.id + '/campaign/' + campaign.id).success(function () {
                    notificationService.success('Success', 'Deleted the campaign successfully!');
                }).error(function () {
                    notificationService.error('Error', 'There was an error in removing the campaign!');
                })
            })
        };
        vm.showSettings = function (subcampaign) {
            httpWrapper.get(UrlConstants.subcampaign + subcampaign.id + '/setting').success(function (response) {
                $uibModal.open({
                    templateUrl: 'app/pages/dashboard/modals/subcampaignInfo.html',
                    size: 'md',
                    controllerAs: 'sh',
                    controller: function ($uibModalInstance) {
                        var sh = this;
                        sh.subcampaign = subcampaign;
                        sh.info = response;
                        sh.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    }
                })
            })
        };
        vm.setStatus = function (subcampaign, str) {
            var data = {
                status: str
            };
            httpWrapper.put(UrlConstants.campaigns + vm.selection.campaign.id + '/subcampaigns/' + subcampaign.id, data)
                .success(function (response) {
                    notificationService.success('Status Set Successfully');
                    subcampaign.status = str;
                }).error(function () {
                notificationService.error("There was an error in changing status");
            })
        }
    }

})();
