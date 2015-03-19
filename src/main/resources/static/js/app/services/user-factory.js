(function(angular) {
	var HATEOAS_URL = '/api/users';
	var UserFactory = function($http, $resource, SpringDataRestAdapter) {

		function User(item) {

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
				
				item.save = function(callback) {

					User.resources.save(item, function(item, headers) {

						var deferred = $http.get(headers().location);

						return SpringDataRestAdapter.processWithPromise(

						deferred).then(function(newItem) {
							
							callback && callback(new User(newItem));
							
						});

					});

				};
			}

			return item;
		}

		User.query = function(callback) {

			var deferred = $http.get(HATEOAS_URL, {});

			return SpringDataRestAdapter.processWithPromise(deferred).then(

			function(data) {

				User.resources = data._resources("self");
				callback && callback(_.map(data._embeddedItems, function(item) {

					return new User(item);

				}));
			});
		};

		User.getById = function(userId, callback) {

			var deferred = $http.get(HATEOAS_URL + '/' + userId);

			return SpringDataRestAdapter.processWithPromise(deferred).then(

			function(data) {

				callback && callback(new User(data));

			});
		};

		User.getByLogin = function(login, callback) {

			var deferred = $http.get('/api/users/search/findUserByLogin?0='
					+ login);

			return SpringDataRestAdapter.processWithPromise(deferred).then(

			function(data) {

				callback && callback(new User(data._embeddedItems[0]));

			});
		};

		User.resources = null;

		User.Resource = $resource('/api/users/:userId', {
			userId : '@id'
		});

		return User;
	};

	UserFactory.$inject = [ '$http', '$resource', 'SpringDataRestAdapter' ];
	angular.module('boipelo').factory("User", UserFactory);
}(angular));