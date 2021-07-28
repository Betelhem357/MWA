angular.module("universityApp").filter("order",NumberOrder);

function NumberOrder(){
    return function(number){
        return "order";
    }
}