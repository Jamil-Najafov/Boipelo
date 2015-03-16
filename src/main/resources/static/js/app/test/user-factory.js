angular.module('boipelo').factory('Comment', CommentFactory);
CommentFactory.$inject = [ '$resource', 'api', 'SpringDataRestAdapter' ];

function CommentFactory($resource, api, SpringDataRestAdapter) {

	function Comment(comment) {
	}

	Comment.queryUsers = queryUsers;

	return Comment;

	function queryUsers() {

		return getApiBase().then(function(apiBase) {

			var userResource = apiBase._resources("users");
			
			console.log(apiBase);
			
			return userResource.get().$promise.then(function(response) {
				
				var processedResponse = SpringDataRestAdapter.process(response);
				var embeddedItems = processedResponse._embeddedItems;
				return embeddedItems;
				
			});

		});

	}

	function getApiBase() {

		return api.getBase().then(function(apiBase) {
			return apiBase;
		});
	}

}