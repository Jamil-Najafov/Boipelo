angular.module('boipelo').factory('Comment', CommentFactory);
CommentFactory.$inject = ['$resource', '$http', 'api', 'SpringDataRestAdapter'];

function CommentFactory($resource, $http, api, SpringDataRestAdapter) {

	var actions = {
		'query': {
			method: 'GET',
			isArray: false
		},
		'updatePartial': {
			method: 'PATCH'
		},
		'save': {
			method: 'POST'
		}

	};


	var Comment = function(data) {
		var self = this;

		self.init = function(data) {
			for (var i in data) {
				self[i] = data[i];
			}

			if (data._resources) {
				self.resources = data._resources("self", {}, {
					updatePartial: {
						method: 'PATCH'
					},
				});
			}
			else {
				// Do it right before the save. Otherwise creaetedAt is not taken into account.
				// self.resources = new Comment.$resource(self);
			}
		};

		self.remove = function(callback) {
			self.resources.remove(callback);
		};

		self.save = function(callback) {
			if (self.id) {
				var data = {
					content: self.content
				};

				self.resources.updatePartial(data, function() {
					callback && callback(self);
				});
			} else {
				self.createdAt = Date.now();
				self.resources = new Comment.$resource(self);
				self.resources.$save(function(item, headers) {
					var promise = $http.get(headers().location)

					SpringDataRestAdapter.processWithPromise(promise).then(function(processed) {
						self.init(processed);
						callback && callback(self);
					});
				});
			}
		};

		self.init(data);

		return self;
	};

	Comment.$resource = $resource('/api/comments/:commentId', {
		commentId: '@commentId'
	}, actions);

	return Comment;

}