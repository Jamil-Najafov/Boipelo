(function(angular) {

	var CommentController = function($scope, $rootScope, Comment) {
		var ctrl = this;
		ctrl.templates = {
			defaultTemplate: CommentController.defaultTemplate,
			viewTemplate: CommentController.defaultTemplate,
			editTemplate: {
				url: 'js/app/templates/comment/editView.html'
			},
		};


		ctrl.postOriginalContent = $scope.post.content;
		ctrl.post = $scope.comment;

		// Clone.
		ctrl.currentTemplate = _.clone(ctrl.templates.defaultTemplate);

		ctrl.removePost = function() {
			// Ask for confirmation if you like.
			ctrl.remove();
		}

		ctrl.editPost = function() {
			ctrl.postOriginalContent = ctrl.post.content;
			setCurrentTemplate(ctrl.templates.editTemplate)
		}

		ctrl.finishEdit = function() {
			ctrl.save()
			setCurrentTemplate(ctrl.templates.viewTemplate)
		}

		ctrl.cancelEdit = function() {
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
				post = new Comment(post);
			}

			post.save();
		}

		ctrl.remove = function() {
			var post = ctrl.post;
			if (!post.remove) {
				post = new Comment(post);
			}

			post.remove(function() {
				$scope.post.comments.splice($scope.post.comments.indexOf(ctrl.post), 1);
			});
		};

		function setCurrentTemplate(template) {
			// Have to use url, otherwise changes in child scope (included scope) doesn't propogate to controller scope
			ctrl.currentTemplate.url = template.url;
		}


	}

	CommentController.defaultTemplate = {
		url: 'js/app/templates/comment/defaultView.html'
	};



	CommentController.$inject = ['$scope', '$rootScope', 'Comment'];

	angular.module('boipelo')
			.controller("CommentController", CommentController);
})(angular)