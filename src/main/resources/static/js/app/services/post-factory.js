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

				var post = new Post.$resource(item);

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

	Post.$resource = $resource("/api/users/:userId/timeline/:postId", {
		userId : '@userId',
		postId : '@postId'
	}, actions);

	Post.getTimeline = function(userId) {

		var deferred = $q.defer();

		getApiBase()
				.then(
						function(apiBase) {

							var usersResource = apiBase._resources('users');

							usersResource.get({
								id : userId
							}).$promise
									.then(function(user) {

										processedUser = SpringDataRestAdapter
												.process(user);

										var timelineResource = processedUser
												._resources('timeline');

										timelineResource.get().$promise
												.then(function(timeline) {

													SpringDataRestAdapter
															.process(
																	timeline,
																	[
																			'poster',
																			'comments',
																			'commenter' ],
																	true).$promise
															.then(function(
																	processedTimeline) {

																deferred
																		.resolve(processedTimeline._embeddedItems ? processedTimeline._embeddedItems
																				: []);

															})
												})
									})
						})

		return deferred.promise;
	}

	return Post;

	function getApiBase() {

		return api.getBase().then(function(apiBase) {
			return apiBase;
		});
	}

}
