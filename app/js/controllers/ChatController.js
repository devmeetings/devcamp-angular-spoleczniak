spolControllers.controller("chatController", ["$scope", "Chat", "loginService", "$rootScope", "$timeout",
    function($scope, Chat, loginService, $rootScope, $timeout) {
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
        $rootScope.menu_active = "chat";
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

        $scope.$watch('chatItems', function () {
            $timeout(function () {
                var wtf    = $('#chat_container');
                var height = wtf[0].scrollHeight;
                wtf.animate({
                    scrollTop: height
                }, 200);
            }, 200);
        }, true);
    }
]);
