angular.module("instrumentsApp").factory("AuthFactory",AuthFactory);

function AuthFactory(){
    let auth = false;
    return {
        authenticated:auth
    }
}