angular.module('boipelo').factory("Post", PostFactory);

PostFactory.$inject = [ '$q', '$http', '$resource', 'SpringDataRestAdapter',
		'api' ];

function PostFactory($q, $http, $resource, SpringDataRestAdapter, api) {

	
	function Post(item) {

		if (item._resources) {
			item.resources = item._resources("self", {}, {
				update : {
					method : 'PUT'
				}
			});

			item.save = function(callback) {
				console.log(item)
				item.resources.update(item, function() {
					callback && callback(item);
				});
			};

			item.remove = function(callback) {

				item.resources.remove(function() {

					callback && callback(item);

				});

			};

		} else {

			item.save = function() {

				var deferred = $q.defer();

				var post = new PostResource(item);

				post.$save(function(post, headers) {

					var promise = $http.get(headers().location)

					SpringDataRestAdapter.processWithPromise(promise, 'poster',
							true).then(function(processedPost) {

						processedPost.comments = [];

						console.log('processedPost', processedPost)
						post = processedPost;

						deferred.resolve(processedPost);

					});
				});

				return deferred.promise;

			};
		}

		return item;
	}

	var actions = {
			'query' : {
				method : 'GET',
				isArray : false
			},
			'update' : {
				method : 'PUT',
				url : ('/api/posts')
			},
			'save' : {
				method : 'POST',
				url : ('/api/posts')
			}

		};

		// Angular built in service $resource is not made for restful resource
		// discovery.
		var PostResource = $resource("/api/users/:userId/timeline/:postId", {
			userId : '@userId',
			postId : '@postId'
		}, actions);

		return Post;
}
