angular.module("meanGames").factory("AuthenticationInterceptor",AuthenticationInterceptor);

function AuthenticationInterceptor(){
    return{
        request:request
    };
    function request(config){
        config.headers = config.headers || {};
        if($window.sessionStorage.token){
            config.headers.Authorization = "Bearer "+$window.sessionStorage;
        }
        return config;
    }
}