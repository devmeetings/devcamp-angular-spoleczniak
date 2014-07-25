spolControllers.controller("loginController", function($scope, loginService) {
	
	$scope.state = 0; 	// 0 = pokaz formularz
						// 1 = zalogowano pomyslnie
						// 2 = blad logowania

	$scope.doLogin = function() {
		var username = $scope.loginUser;
		var password = $scope.loginPassword;

		if (loginService.doLogin(username, password)) {
			$scope.state = 1;
		} else {
			$scope.state = 2;
		}
	}
});