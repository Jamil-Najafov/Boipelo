(function(angular) {

	var PostController = function($scope, $rootScope, Post) {
		var ctrl = this;
		ctrl.templates = {
			defaultTemplate: PostController.defaultTemplate,
			viewTemplate: PostController.defaultTemplate,
			editTemplate: {
				url: 'js/app/templates/post/editView.html'
			},
		};


		ctrl.postOriginalContent = $scope.post.content;
		ctrl.post = $scope.post;

		// Clone.
		ctrl.currentTemplate = _.clone(ctrl.templates.defaultTemplate);

		ctrl.editPost = function($scope) {
			ctrl.postOriginalContent = ctrl.post.content;
			setCurrentTemplate(ctrl.templates.editTemplate)
		}

		ctrl.finishEdit = function($scope) {
			ctrl.save()
			setCurrentTemplate(ctrl.templates.viewTemplate)
		}

		ctrl.cancelEdit = function($scope) {
			ctrl.post.content = ctrl.postOriginalContent;
			setCurrentTemplate(ctrl.templates.viewTemplate)
		}

		ctrl.keyDown = function(e) {
			if (e.keyCode === 13 || e.keyCode === 10) { // User pressed enter...
				if (e.shiftKey) { // ... while holding shift.
					// Do nothing. New line should be automatically added to the textarea.
				} else {
					// Save and quit.
					ctrl.finishEdit();
				}
			}
		}

		ctrl.save = function() {
			var post = ctrl.post;
			if (!post.save) {
				post = new Post(post);
			}

			// Dirty fix for Can not deserialize instance of java.util.Set out of START_OBJECT token...
			if (post.comments.length == undefined) { // Not an array
				post.comments = [];
			}

			// Not right, baby. Not right.
			post.poster = post._links.poster.id;

			post.updateContent();
		}

		function setCurrentTemplate(template) {
			// Have to use url, otherwise changes in child scope (included scope) doesn't propogate to controller scope
			ctrl.currentTemplate.url = template.url;
		}


	}

	PostController.defaultTemplate = {
		url: 'js/app/templates/post/defaultView.html'
	};



	PostController.$inject = ['$scope', '$rootScope', 'Post'];

	angular.module('boipelo')
			.controller("PostController", PostController);
})(angular)