var apiUrl = {
    announcer: 'http://178.62.66.155:3000/api/',
    publisher: 'http://178.62.66.155:3005/api/'
};
clientsApiAnnouncer = apiUrl.announcer + 'clients/';
clientsApiPublisher = apiUrl.publisher + 'clients/';

angular.module("utils.apiUrls", []).constant("UrlConstants", {
    apiUrl: {
        announcer: apiUrl.announcer,
        publisher: apiUrl.publisher
    },
    login: {
        announcer: clientsApiAnnouncer + 'login',
        publisher: clientsApiPublisher + 'login'
    },
    campaigns: apiUrl.announcer + 'campaigns/',
    clients: {
        announcer: clientsApiAnnouncer,
        publisher: clientsApiPublisher
    },
    subcampaign: apiUrl.announcer + 'subcampaigns/',
    application: apiUrl.publisher + 'applications/'
});