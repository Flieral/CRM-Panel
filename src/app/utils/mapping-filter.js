/**
 * Created by Sajjad on 4/16/2017.
 */
angular.module("utils.filters", [])
    .filter('countryMap', function ($rootScope){
    return function (input){
        var output;
        for (var i = 0; i < $rootScope.configs.countries.length; i++){
            var country = $rootScope.configs.countries[i];
            if (country.code == input){
                output = country.name;
                return output;
            }
        }
    }
}).filter('languageMap', function ($rootScope){
    return function (input){
        var output;
        for (var i = 0; i < $rootScope.configs.languages.length; i++){
            var language = $rootScope.configs.languages[i];
            if (language.code == input){
                output = language.name;
                return output;
            }
        }
    }
});