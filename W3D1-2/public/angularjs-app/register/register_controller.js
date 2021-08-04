angular.module('instrumentsApp').controller('RegisterController', registerController);

function registerController(UserFactory) {
    const vm = this;

    vm.formdata = {};

    vm.register = function() {
        console.log("data",vm.formdata);
        if (vm.repeatPassword !== vm.formdata.password) {
            console.log("passowrd not match");
            vm.err = "password must match";
        } else {
            vm.err = "";
            UserFactory.register(vm.formdata).then(function(response) {
                console.log(response.data);
                vm.success = "Registerd successfully!";
            }).catch(function(err) {
                vm.err = "failed to register";
                vm.success = '';
            });
        }
    };

}
