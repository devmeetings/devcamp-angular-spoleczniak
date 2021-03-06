spolControllers.controller("loginController", function($scope, loginService, $rootScope) {
	
	$scope.state = 0; 	// 0 = pokaz formularz
						// 1 = zalogowano pomyslnie
						// 2 = blad logowania
    $rootScope.menu_active = '';
	$scope.doLogout = function() {
		loginService.doLogout();
	};

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