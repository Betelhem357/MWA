angular.module('instrumentsApp').directive('instrumentsNavigation', instrumentsNavigation);

function instrumentsNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directives/navigation/navigation.html'
    }
}