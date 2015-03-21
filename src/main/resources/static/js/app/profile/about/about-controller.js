angular.module('boipelo').controller("AboutController", AboutController);
AboutController.$inject = [ '$scope', '$rootScope', '$upload', 'User',
		'AuthenticationFactory' ];

function AboutController($scope, $rootScope, $upload, User,
		AuthenticationFactory) {

	var principal = AuthenticationFactory.getPrincipal();
	
	var profileImageURI = "http://localhost:8080/api/users/" + principal.id
			+ "/profilepicture";
	
	$scope.profileImageURI = profileImageURI;

	$scope.updateUser = function(user) {

		console.log($scope.$parent.user)
		$scope.$parent.user.save();
		$rootScope.login = $scope.$parent.user.login;
	}

	$scope.upload = function(files) {

		$scope.profileImageURI = "";

		if (files && files.length) {

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				$upload.upload({
					url : '/api/upload',
					fields : {
						'userId' : $scope.$parent.user.id
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
									+ 'uploaded. Response: '
									+ JSON.stringify(data));

							$scope.profileImageURI = profileImageURI;

						});
			}
		}

	};

};