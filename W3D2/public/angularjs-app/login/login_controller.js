angular.module("meanGames").controller("LoginController",LoginController)

function LoginController(UserFactory,AuthFactory,$window,jwtHelper, $location){
    const vm = this;
    vm.credential = {};
    vm.isLoggedIn = function(){
        return AuthFactory.authenticated;
    }
    vm.login = function(){
        console.log("Login called",vm.credential);
        UserFactory.login(vm.credential).then(function(result){
            console.log("result",result);
            if(result.status == 201){
                $window.sessionStorage.token = result.data.password;

                //Retrive data from token
                //const token = $window.sessionStorage.token;
                //const decodedToken = jwtHelper.decodeToken(result.data.password);
                AuthFactory.authenticated =  true;
                
                vm.credential = {};
                $location.path("/");
                vm.err = "";
            }else{
                vm.err = result.data.message;
            }
        }).catch(function(err){
            console.log("err",err);
            vm.err = err;
        });
    }
    vm.logout = function(){
        AuthFactory.authenticated = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    }
}