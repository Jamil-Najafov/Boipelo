angular.module('boipelo').factory("Friendship", FriendshipFactory);
FriendshipFactory.$inject = [ '$resource', 'SpringDataRestAdapter' ];

function FriendshipFactory($resource, SpringDataRestAdapter) {

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