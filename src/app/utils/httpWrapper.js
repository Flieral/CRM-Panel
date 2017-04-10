angular.module('utils.httpWrapper', []).service('httpWrapper', ['$http', httpWrapperFunction]);
function httpWrapperFunction($http) {
    var toAdd = '?access_token=' + $rootScope.accessToken;
    this.get = function (url) {
        return $http.get(url + toAdd);
    };
    this.post = function (url, data) {
        return $http.get(url + toAdd, data);
    };

}