angular.module('boipelo').controller("HeaderController", HeaderController);
HeaderController.$inject = [ '$rootScope', '$scope', '$http', '$location', '$translate', 'AuthenticationFactory' ];

function HeaderController($rootScope, $scope, $http, $location, $translate, AuthenticationFactory) {

	var principal = {};
	$scope.profileImageURI = "";
	
	$scope.languages=[{name:"English", code:"enUS"}, {name:"Türkçe", code:"trTR"}];
	$scope.selectedLanguage = $scope.languages[0];
	
	AuthenticationFactory.authenticate(function(){
		
		/*
		 * principal = AuthenticationFactory.getPrincipal(); var profileImageURI =
		 * "http://localhost:8080/api/users/" + principal.id +
		 * "/profilepicture";
		 * 
		 * $scope.profileImageURI = profileImageURI;
		 */
		
	}); // Authenticate upon page refresh.

	// This fails while it shouldn't and redirects logged users to login page.
	// Hence the comment out.
	if (!$rootScope.authenticated) {

		// $location.path("/login");

	}

	$scope.logout = function() {
		$http.post('/logout', {}).success(function() {
			$rootScope.authenticated = false;
			$location.path("/login");
		}).error(function(data) {
			$rootScope.authenticated = false;
		});
	}

	$scope.goToUser = function(username) {
		$location.path("/profile/" + username);
	}

	$scope.goTo = function(path) {
		$location.path(path);
	}
	
	$scope.changeLanguageTo = function(selectedLanguage) {
		console.log(selectedLanguage)
		$translate.use(selectedLanguage.code);
	}

}