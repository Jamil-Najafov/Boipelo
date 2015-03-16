(function(angular) {
	var FriendshipFactory = function($resource, SpringDataRestAdapter) {

		var actions = {
			'query' : {
				method : 'GET',
				isArray : false
			},
			'update' : {
				method : 'PUT'
			}

		};

		var Friendship = $resource("/api/friendships/:friendshipId", {
			friendshipId : '@friendshipId'
		}, actions);

		return Friendship;

	}

	FriendshipFactory.$inject = [ '$resource', 'SpringDataRestAdapter' ];
	angular.module('boipelo').factory("Friendship", FriendshipFactory);
}(angular));