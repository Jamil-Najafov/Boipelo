angular.module('boipelo').factory('httpInterceptor', httpInterceptor);
httpInterceptor.$inject = [ '$q', '$window', '$location' ];

function httpInterceptor($q, $window, $location) {

	return {

		response : response,
		responseError : responseError

	}

	function response(response) {
		
		if (response.status === 401) {
			console.log("Response 401");
		}
		
		return response || $q.when(response);
		
	}

	function responseError(rejection) {
		
		if (rejection.status === 401) {
			
			// console.log("Response Error 401", rejection);

			$location.url('/login')// .search('returnTo',
			// $location.path());

			// console.log($location)
			
		}
		
		return $q.reject(rejection);
	}
}