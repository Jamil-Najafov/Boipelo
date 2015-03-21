angular.module('boipelo').service("RegistrationService", RegistrationService);
RegistrationService.$inject = [ '$http' ];

function RegistrationService($http) {
	
	this.register = register;
	
	function register(item) {
		
		// Not so restful as /register is not discoverable.
		$http.post('/register', item);
		
	};
	
}