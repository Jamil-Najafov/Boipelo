angular.module('boipelo').service("RegistrationService", RegistrationService);
RegistrationService.$inject = [ '$http' ];

var RegistrationService = function($http) {
	this.register = function(item) {
		
		// Not so restful as /register is not discoverable.
		$http.post('/register', item);
		
	};
}