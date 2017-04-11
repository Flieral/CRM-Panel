angular.module('utils.httpWrapper', []).service('httpWrapper', ['$http', '$q', '$cookies','$rootScope', httpWrapperFunction]);
function httpWrapperFunction($http, $q, $cookies, $rootScope) {
    var toAdd = '?access_token=' + $rootScope.access_token;
    function getAccessToken() {
        var deferred = $q.defer();
        if ($cookies.get('token')) {
            deferred.resolve($cookies.get('token'));
        } else {
            deferred.reject();
        }
        return deferred.promise;
    };
    this.get = function (url) {
        if (!$rootScope.access_token) {
            getAccessToken().then(function (token) {
                $rootScope.access_token = token;
                return $http.get(url + toAdd);
            }).then(function(){
                $rootScope.loggedIn = false;
                $state.go('login');
            });
        }else{
            return $http.get(url + toAdd);
        }
    };
    this.delete = function (url) {
        if (!$rootScope.access_token) {
            getAccessToken().then(function (token) {
                $rootScope.access_token = token;
                return $http.delete(url + toAdd);
            }).then(function(){
                $rootScope.loggedIn = false;
                $state.go('login');
            });
        }else{
            return $http.delete(url + toAdd);
        }
    };
    this.put = function (url, data) {
        if (!$rootScope.access_token) {
            getAccessToken().then(function (token) {
                $rootScope.access_token = token;
                return $http.put(url + toAdd);
            }).then(function(){
                $rootScope.loggedIn = false;
                $state.go('login');
            });
        }else{
            return $http.put(url + toAdd, data);
        }
    };
    this.post = function (url, data) {
        return $http.get(url + toAdd, data);
    };

}