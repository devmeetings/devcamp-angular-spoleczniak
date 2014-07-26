spolControllers.controller('CommentsController', ['$scope', '$rootScope', 'Comments',
	function ($scope, $rootScope, Comments) {
	    'use strict';

	    $scope.comments = Comments.getComments();
	
	}
]);

spolControllers.controller('CommentsAddController', ['$scope', '$rootScope', '$routeParams', 'Comments', 'loginService',
	function ($scope, $rootScope, $routeParams, Comments, loginService) {
	    'use strict';

	    loginService.redirectLogin();

        $scope.newComment = Comments.getBlankComment();

	    $scope.addComment = function($event) {
	    	$event.preventDefault();	    	
	    	$scope.newComment.ticketId = parseInt($routeParams.id, 10);
	    	Comments.addComment($scope.newComment);
	    };

	}
]);

spolControllers.controller('CommentsShowController', ['$scope', '$rootScope', '$routeParams', 'Comments', 'loginService',
	function ($scope, $rootScope, $routeParams, Comments, loginService) {
	    'use strict';

	    $scope.comments = Comments.getComments($routeParams.id);
	}
]);
