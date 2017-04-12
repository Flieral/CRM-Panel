
// apiUrl = 'http://192.168.53.91:3000/api/';
apiUrl = 'http://178.62.66.155:3000/api/';
clientsApi = apiUrl + 'clients/';

angular.module("utils.apiUrls", []).constant("UrlConstants", {
    login: clientsApi + 'login',
    campaigns: apiUrl + 'campaigns/',
    clientsApi: clientsApi,
    subcampaign: apiUrl + 'subcampaigns/',
    apiUrl: apiUrl

});