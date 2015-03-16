app.controller('LoginController',

function($http, $scope, $location, $rootScope, AuthenticationFactory) {
	
	$scope.credentials = {};

	$scope.login = function() {
		$http.post('login', $.param($scope.credentials), {
			headers : {
				"content-type" : "application/x-www-form-urlencoded"
			}
		}).success(function(data) {
			AuthenticationFactory.authenticate(function() {
				if ($rootScope.authenticated) {
					$location.path("/");
					$scope.error = false;
				} else {
					$location.path("/login");
					$scope.error = true;
				}
			});
		}).error(function(data) {
			$location.path("/login");
			$scope.error = true;
			$rootScope.authenticated = false;
		})
	};

});