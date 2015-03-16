app.controller('HomeController', function($scope, $rootScope, $resource,
		$location, User, Friendship, AuthenticationFactory) {

	$scope.users = [];
	//$scope.friendships = [];

	activate();

	function activate() {

		User.query(function(response) {
			$scope.users = response ? response : [];
			console.log('home controller users', $scope.users)
		});

		/*Friendship.query(function(response) {
			$scope.friendships = response ? response : [];
		});*/

	}
	
	

	$scope.addFriend = function(user, users) {
		var newFriendship = new Friendship({

			//!!?
			requester : users.filter(function(item) {
				return (item.login == $rootScope.login);
			})[0]._links.self.href,
			confirmer : user._links.self.href

		});

		newFriendship.$save(function(hede) {

		});

	}

	$scope.updateUser = function(user) {
		user.save();
	};

	// Duplicate from NavigationController
	$scope.goToUser = function(username) {
		$location.path("/profile/" + username);
	}

});
