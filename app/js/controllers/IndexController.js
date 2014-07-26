spolControllers.controller("indexController", function($scope, loginService, $rootScope) {
		$scope.loggedin = loginService.getLoggedInId() ? 1 : 0;
		$scope.logout = function($event) {
			loginService.doLogout();
			$scope.loggedin = 0;
            $event.preventDefault();
		};
		$rootScope.$on("doLogin", function() {
			$scope.loggedin = 1;
		});
	});