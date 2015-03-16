(function(angular) {

	var TestController = function($scope, $rootScope, $http, $resource,
			ResourceWrapper, SpringDataRestAdapter, api, Comment) {

		var vm = this;
		vm.users = [];

		activate();

		function activate() {
			return getUsers().then(function() {

				console.log('users: ', vm.users);

			});
		}

		function getUsers() {
			return Comment.queryUsers().then(function(users) {
				vm.users = users;
				return vm.users
			});
		}

	};

	TestController.$inject = [ '$scope', '$rootScope', '$http', '$resource',
			'ResourceWrapper', 'SpringDataRestAdapter', 'api', 'Comment' ];
	angular.module('boipelo').controller("TestController", TestController);

}(angular));