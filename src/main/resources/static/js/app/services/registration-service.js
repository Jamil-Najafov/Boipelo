(function(angular) {

	var RegistrationService = function($http) {
		this.register = function(item) {
			$http.post('/register', item);
		};
	};

	RegistrationService.$inject = [ '$http' ];
	angular.module('boipelo').service("RegistrationService",
			RegistrationService);

}(angular));