angular.module('boipelo').controller("AboutController", AboutController);
AboutController.$inject = [ '$scope', '$rootScope', '$routeParams', '$upload', 'User' ];

function AboutController($scope, $rootScope, $routeParams, $upload, User,
		AuthenticationFactory) {

	$scope.profile = {};
	$scope.profile.isCurrentUser = false;
	$scope.updateUser = updateUser;

	init();
	
	function init() {
		
		User.getByLogin($routeParams.login, function(user) {

			$scope.profile = user
			$scope.profile.isCurrentUser = user.id == $rootScope.id;

		});
		
	}

	function updateUser(user) {

		console.log($scope.$parent.user)
		$scope.$parent.user.save();
		$rootScope.login = $scope.$parent.user.login;

	}
};