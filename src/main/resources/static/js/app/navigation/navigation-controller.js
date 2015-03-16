app.controller('NavigationController',

function($rootScope, $scope, $http, $location, AuthenticationFactory) {

	AuthenticationFactory.authenticate(); // Authenticate upon page refresh.

	//This fails while it shouldn't and redirects logged users to login page. Hence the comment out.
	if (!$rootScope.authenticated) {

		//$location.path("/login");

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

});