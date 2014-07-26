spolControllers.controller("chatController", ["$scope", "Chat", "loginService",
    function($scope, Chat, loginService) {
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
        $scope.chatItems = Chat.getMessages();
        $scope.newMessage = Chat.getBlankMessage();
        $scope.sendMessage = function() {
        	Chat.addMessage($scope.newMessage);
        	$scope.newMessage = Chat.getBlankMessage();
        };
    }
]);