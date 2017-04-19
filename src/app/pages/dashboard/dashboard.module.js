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

    function dashboardControllerFunction($uibModal, $scope, $rootScope, notificationService, httpWrapperAn, UrlConstants, confirmModal) {
        var vm = this;
        vm.selection = {};
        $scope.model = {};
        httpWrapperAn.get(UrlConstants.clients.announcer).success(function (response) {
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
            httpWrapperAn.get(UrlConstants.clients.announcer + client.id + '/campaigns').success(function (response) {
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
            httpWrapperAn.get(UrlConstants.campaigns + campaign.id + '/subcampaigns').success(function (response) {
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
                controller: function ($uibModalInstance, $filter, httpWrapperAn, notificationService) {
                    var sh = this;
                    sh.formData = angular.copy(client);
                    sh.country = {
                        name: $filter('countryMap')(sh.formData.registrationCountry),
                        code: sh.formData.registrationCountry
                    };
                    sh.countries = $rootScope.configs.countries;
                    sh.submitForm = function () {
                        sh.formData.registrationCountry = sh.country.code;
                        httpWrapperAn.put(UrlConstants.clients.announcer + client.id, sh.formData).success(function (){
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
                controller: function ($uibModalInstance, $filter, httpWrapperAn, notificationService) {
                    var sh = this;
                    sh.formData = angular.copy(campaign);
                    sh.startStyles = $rootScope.configs.startStyle;
                    sh.mediaStyles = $rootScope.configs.mediaStyle;
                    sh.submitForm = function (){
                        httpWrapperAn.put(UrlConstants.clients.announcer + vm.selection.client.id + '/campaigns/' + campaign.id, sh.formData).success(function (){
                            notificationService.success("Success", "Campaign Edited Successfully");
                            campaign = sh.formData;
                            sh.cancel();
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
        vm.editSubcampaign = function (subcampaign){
            $uibModal.open({
                templateUrl: 'app/pages/dashboard/modals/editSubcampaign.html',
                size: 'md',
                controllerAs: 'sh',
                controller: function ($uibModalInstance, $filter, httpWrapperAn, notificationService) {
                    var sh = this;
                    sh.formData = angular.copy(subcampaign);
                    sh.subcampaignPlans = $rootScope.configs.subcampaignPlan;
                    sh.placementStyles = $rootScope.configs.placementStyle;
                    sh.plan = {
                        name: $filter('planMap')(sh.formData.plan),
                        code: sh.formData.plan
                    };
                    console.log(sh.subcampaignPlans);
                    sh.submitForm = function (){
                        sh.formData.plan = sh.plan.code;
                        console.log(sh.formData);
                    };
                    sh.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                }
            })
        };
        vm.removeClient = function (client) {
            confirmModal.open('Removing ' + client.username, 'Are you sure to remove the client? The action could not be undone!').then(function () {
                httpWrapperAn.delete(UrlConstants.clients.announcer + client.id).success(function () {
                    httpWrapperAn.get(UrlConstants.clients.announcer).success(function (response) {
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
                httpWrapperAn.delete(UrlConstants.clients.announcer + campaign.clientId + '/campaign/' + campaign.id).success(function () {
                    notificationService.success('Success', 'Deleted the campaign successfully!');
                }).error(function () {
                    notificationService.error('Error', 'There was an error in removing the campaign!');
                })
            })
        };
        vm.removeSubcampaign = function (subcampaign) {
            var campaign = vm.selection.campaign;
            confirmModal.open('Removing ' + subcampaign.name, 'Are you sure to remove the subcampaign? The action could not be undone!').then(function () {
                httpWrapperAn.delete(UrlConstants.campaigns + campaign.id + '/subcampaign/' + subcampaign.id).success(function () {
                    notificationService.success('Success', 'Deleted the subcampaign successfully!');
                }).error(function () {
                    notificationService.error('Error', 'There was an error in removing the subcampaign!');
                })
            })
        };
        vm.showSettings = function (subcampaign) {
            httpWrapperAn.get(UrlConstants.subcampaign + subcampaign.id + '/setting').success(function (response) {
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
            httpWrapperAn.put(UrlConstants.campaigns + vm.selection.campaign.id + '/subcampaigns/' + subcampaign.id, data)
                .success(function (response) {
                    notificationService.success('Status Set Successfully');
                    subcampaign.status = str;
                }).error(function () {
                notificationService.error("There was an error in changing status");
            })
        }
    }

})();
