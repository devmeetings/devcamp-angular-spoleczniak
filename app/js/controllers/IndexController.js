spolControllers.controller("indexController", function($scope, loginService, $rootScope, $timeout) {
		$scope.loggedin = loginService.getLoggedInId() ? 1 : 0;
		$scope.logout = function($event) {
			loginService.doLogout();
			$scope.loggedin = 0;
            $event.preventDefault();
		};

		$scope.flashMessages = [];

		
		$rootScope.$on("doLogin", function() {
			$scope.loggedin = 1;
		});

		$rootScope.$on("flashMessage", function(event, message) {

			$scope.flashMessages.push({
				message: message
			});

			$timeout(function() {
				$scope.flashMessages = $scope.flashMessages.splice(1, $scope.flashMessages.length-1);
			}, 2000);
		});

		$scope.ls = loginService;
	});