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

/*
 * (function(angular) {
 * 
 * angular.module('boipelo').factory("Api", Api); Api.$inject = [ '$http',
 * '$resource', 'SpringDataRestAdapter' ];
 * 
 * 
 * 
 * 
 * var Api = function($http, $resource, SpringDataRestAdapter) {
 * 
 * var baseURI = '/api';
 * 
 * return { getBase:getBase, };
 * 
 * function getBase(){
 * 
 * var deferred = $http.get(baseURI);
 * 
 * return
 * SpringDataRestAdapter.processWithPromise(deferred).then(getBaseComplete)
 * .catch(getBaseFailed);
 * 
 * 
 * function getBaseComplete(response) { return response; }
 * 
 * function getBaseFailed(error) { logger.error('XHR Failed for getBase.' +
 * error.data); } }; }
 * 
 * 
 * }(angular));
 */