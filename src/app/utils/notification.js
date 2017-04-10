angular.module('utils.notification', []).service('notificationService', ['toastr', notificationServiceFunction]);
function notificationServiceFunction(toastr) {
    var options = {
        "autoDismiss": false,
        "positionClass": "toast-top-full-width",
        "type": "info",
        "timeOut": "5000",
        "extendedTimeOut": "2000",
        "allowHtml": false,
        "closeButton": true,
        "tapToDismiss": true,
        "progressBar": true,
        "newestOnTop": true,
        "maxOpened": 0,
        "preventDuplicates": false,
        "preventOpenDuplicates": false
    };
    this.clear = function () {
        toastr.clear();
    };
    this.info = function (title, text) {
      toastr.info(text, title, options);
    };
    this.warning = function (title, text) {
        toastr.warning(text, title, options);
    };
    this.success = function (title, text) {
        toastr.success(text, title, options);
    };
    this.error = function (title, text) {
        toastr.error(text, title, options);
    };
}