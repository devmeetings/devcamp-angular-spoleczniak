spolControllers.controller("indexController", function($scope, loginService, $rootScope) {
		$scope.loggedin = loginService.getLoggedInId() ? 1 : 0;
		$scope.logout = function() {
			loginService.doLogout();
			$scope.loggedin = 0;
		};
		$rootScope.$on("doLogin", function() {
			$scope.loggedin = 1;
		});
		$scope.ls = loginService;
	});