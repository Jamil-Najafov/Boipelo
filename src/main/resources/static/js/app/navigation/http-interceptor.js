'use strict';

angular.module('boipelo').factory(
		'httpInterceptor',
		function httpInterceptor($q, $window, $location) {
			return {
				response : function(response) {
					if (response.status === 401) {
						console.log("Response 401");
					}
					return response || $q.when(response);
				},
				responseError : function(rejection) {
					if (rejection.status === 401) {
						//console.log("Response Error 401", rejection);
						
						$location.url('/login')//.search('returnTo', $location.path());
						
						//console.log($location)
					}
					return $q.reject(rejection);
				}
			}
		});