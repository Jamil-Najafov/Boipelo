/*
 * This is the example service/factory format that must be used. 
 * Explicit bracket style and constructor injection protects against minification and uglification errors.
 * Constructor right after .$inject helps see injection mismatches easier.
 * Public member declarations up top, implementation details down bottom.
 * */ 

angular.module('boipelo').factory('api', api);
api.$inject = ['$http', 'SpringDataRestAdapter'];

function api($http, SpringDataRestAdapter) {
	
    return {
    	getBase: getBase
    };

    function getBase() {
    	
    	var deferred = $http.get('/api');
    	
    	return SpringDataRestAdapter.processWithPromise(deferred).then(getBaseComplete).catch(getBaseFailed);

        function getBaseComplete(response) {
        	
            return response;
            
        }

        function getBaseFailed(error) {
        	
            console.log('XHR Failed for getAvengers.' + error);
            
        }
    }
}