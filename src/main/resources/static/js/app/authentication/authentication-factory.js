(function(angular) {
	var AuthenticationFactory = function($http, $rootScope, $location) {

		return {

			authenticate : authenticate,
			login : login,
			logout : logout

		};

		/////////////////////////////

		function authenticate(callback) {

			$http.get('user').success(function(data) {

				if (data.name) {

					$rootScope.authenticated = true;
					$rootScope.login = data.principal.login;
					$rootScope.id = data.principal.id;

				} else {

					$rootScope.authenticated = false;
					$location.path("/login");

				}

				callback && callback();

			}).error(function() {

				$rootScope.authenticated = false;
				callback && callback();

			});

		}

		function login(credentials) {
			return $http.post('login', $.param(credentials), {
				headers : {
					"content-type" : "application/x-www-form-urlencoded"
				}
			})
		}

		function logout() {
			return $http.post('/logout', {})
		}

	}

	AuthenticationFactory.$inject = [ '$http', '$rootScope', '$location' ];
	angular.module('boipelo').factory("AuthenticationFactory",
			AuthenticationFactory);
}(angular));