spolControllers.controller("chatController", ["$scope", "Chat", "loginService",
    function($scope, Chat, loginService) {
    	loginService.redirectLogin();
        /*$scope.chatItems = [{
        	user: "admin",
        	adminMessage: 1,
        	message: "Ble"
        },
        {
        	user: "test",
        	adminMessage: 0,
        	message: "co"
        },
        {
        	user: "admin",
        	adminMessage: 1,
        	message: "pstro"
        }];*/
        $scope.ls = loginService;
        $scope.chatItems = Chat.getMessages();
        $scope.chatIsLoaded = false;

        $scope.chatItems.$on("ready", function() {
        	$scope.chatIsLoaded = true;
        });

        $scope.newMessage = Chat.getBlankMessage();
        $scope.sendMessage = function() {
        	Chat.addMessage($scope.newMessage);
        	$scope.newMessage = Chat.getBlankMessage();
        };

    }
]);
