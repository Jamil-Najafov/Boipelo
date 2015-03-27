(function(angular) {

	var TimelineController = function($scope, $rootScope, Post, User, Comment) {

		$scope.newPost = {};
		$scope.newComment = {};
		$scope.timeline = [];
		var posted = {};
		var poster = {};

		$scope.addPost = addPost;
		$scope.addComment = addComment;

		activate();

		function activate() {
			return getTimeline($scope.$parent.$parent.user.id).then(
					function() {
						console.log('$scope.timeline on timelinecontroller', $scope.timeline)
					});
		}

		User.Resource.get({
			userId : $rootScope.id
		}, function(user) {
			poster = user;
		});

		User.Resource.get({
			userId : $scope.$parent.$parent.user.id
		}, function(user) {
			posted = user;
		});

		function addPost(newPost) {

			var post = new Post({

				content : newPost.content,
				poster : poster._links.self.href,
				postedTo : posted._links.self.href,
				createdAt: Date.now(),

			})

			post.save().then(function(savedPost) {

				$scope.timeline.push(savedPost);
				console.log('savedPost', savedPost);

			});

			$scope.newPost = {};
		}

		function addComment(postWithComment) {

			console.log('comments', postWithComment.comments)

			var newComment = new Comment({

				content : postWithComment.newComment.content,
				commenter : poster._links.self.href,
				commentedTo : postWithComment._links.self.href

			});
			
			newComment.save(function(comment) {

				if (postWithComment.comments.constructor != Array) {
					postWithComment.comments = []
				}
				comment.commenter = poster;
				postWithComment.comments.push(comment);
				postWithComment.newComment = {};

			});

		}

		function getTimeline(userId) {

			return Post.getTimeline(userId).then(function(timeline) {
				$scope.timeline = timeline;
				return $scope.timeline;
			});
		}
	};

	TimelineController.$inject = [ '$scope', '$rootScope', 'Post', 'User',
			'Comment' ];
	angular.module('boipelo')
			.controller("TimelineController", TimelineController);

}(angular));