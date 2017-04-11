var confirmModalFunction = function($uibModal) {
    this.open = function (title, text) {
        var modalInstance = $uibModal.open({
            animation: true,
            template: '<div class="modal-header">' +
            '<button type="button" class="close" ng-click="cancel()" ><span aria-hidden="true">×</span></button>' +
            '<h3 class="modal-title">{{title}}</h3>' +
            '</div>' +
            '<div class="modal-body">{{text}}</div>' +
            '<div class="modal-footer"> ' +
            '<button class="btn btn-danger" type="button" ng-click="cancel()">No, cancel!</button>' +
            '<button class="btn btn-success" type="button" ng-click="ok()">Yes</button>' +
            '</div>',
            controller:function($uibModalInstance, $scope){
                $scope.text = text;
                $scope.title = title;

                $scope.ok = function () {
                    $uibModalInstance.close(true);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

            },
            size: 'sm'
        });

        return modalInstance.result;
    };

};

angular.module('utils.confirmModal', ['ui.bootstrap.modal']).service('confirmModal', ['$uibModal', confirmModalFunction]);