app.controller('ProfileController', function($scope, $rootScope, $routeParams,
		User) {

	$scope.user = {};

	init();

	function init() {

		User.getByLogin($routeParams.login, function(user) {
			
			$scope.user = user
				
		});

		$scope.templates =

		[ {
			name : 'about',
			url : 'js/app/profile/about/about.html'
		}, {
			name : 'timeline',
			url : 'js/app/profile/timeline/timeline.html'
		} ];

		var defaultTemplateId = 1;
		$scope.template = $scope.templates[defaultTemplateId];

	}

});
