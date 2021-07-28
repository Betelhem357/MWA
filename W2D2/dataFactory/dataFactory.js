angular.module("universityApp").factory("universityFactory", universityFactory);
function universityFactory($http) {
    return {
        getUniversitiesByCountry: getUniversitiesByCountry
    };
    
    function getUniversitiesByCountry(country) {
        return $http.get("http://universities.hipolabs.com/search?country=" + country).then(complete).catch(failed); 
    }
    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error.statusText;
    }
}
