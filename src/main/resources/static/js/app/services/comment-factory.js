angular.module('boipelo').factory('Comment', CommentFactory);
CommentFactory.$inject = [ '$resource', 'api', 'SpringDataRestAdapter' ];

function CommentFactory($resource, api, SpringDataRestAdapter) {

	var actions = {
		'query' : {
			method : 'GET',
			isArray : false
		},
		'update' : {
			method : 'PUT'
		},
		'save' : {
			method : 'POST'
		}

	};

	var Comment = $resource('/api/comments/:commentId', {
		commentId : '@commentId'
	}, actions);

	return Comment;

}