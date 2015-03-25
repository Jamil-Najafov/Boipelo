angular.module('boipelo').controller("ProfileController", ProfileController);
ProfileController.$inject = [ '$scope', '$rootScope', '$routeParams',
		'$window', '$upload', 'User' ];

function ProfileController($scope, $rootScope, $routeParams, $window, $upload,
		User) {

	$scope.profile = {};
	$scope.profile.isCurrentUser = false;
	$scope.upload = upload;
	var profileImageURI = "";
	
	init();

	function init() {

		$scope.templates =

		[ {
			name : 'about',
			url : 'js/app/profile/about/about.html'
		}, {
			name : 'timeline',
			url : 'js/app/profile/timeline/timeline.html'
		} ];

		$scope.template = $scope.templates[0];
		
		User.getByLogin($routeParams.login, function(user) {

			$scope.profile = user
			$scope.profile.isCurrentUser = user.id == $rootScope.id;

			profileImageURI = "http://localhost:8080/api/users/" + user.id
					+ "/profilepicture";

			$scope.profileImageURI = profileImageURI;

		});
		
	}

	function upload(files) {

		// Angular updates an img whenever the src is changed.
		$scope.profileImageURI = "";

		if (files && files.length) {

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$upload.upload({
					url : '/api/upload',
					fields : {
						'userId' : $rootScope.id
					},
					file : file
				}).progress(
						function(evt) {
							var progressPercentage = parseInt(100.0
									* evt.loaded / evt.total);
							console.log('progress: ' + progressPercentage
									+ '% ' + evt.config.file.name);
						}).success(
						function(data, status, headers, config) {
							console.log('file ' + config.file.name
									+ ' uploaded. Response: '
									+ JSON.stringify(data));

							$scope.profileImageURI = profileImageURI;

						});
			}
		}
	}
}
