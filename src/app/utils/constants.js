var apiUrl = {
    announcer: 'http://178.62.66.155:3000/api/',
    publisher: 'http://178.62.66.155:3005/api/'
};
clientsApi = apiUrl.announcer + 'clients/';

angular.module("utils.apiUrls", []).constant("UrlConstants", {
    login: clientsApi + 'login',
    campaigns: apiUrl.announcer + 'campaigns/',
    clientsApi: clientsApi,
    subcampaign: apiUrl.announcer + 'subcampaigns/',
    apiUrlAnnouncer: apiUrl.announcer,
    apiUrlPublisher: apiUrl.publisher
});