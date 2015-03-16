(function(angular) {
	
	var RegistrationController = function($scope, $location, RegistrationService) {
		

		$scope.registerUser = function(user) {

			RegistrationService.register(user);
			$location.path('login')

		};
		
	};

	RegistrationController.$inject = [ '$scope', '$location', 'RegistrationService' ];
	angular.module('boipelo').controller("RegistrationController", RegistrationController);
	
}(angular));