/*
    Statusy:
    - nowy,
    - zaakceptowany
    - rozwiązany
    - zamknięty

 */

spolControllers.controller('AdminController', ['$scope', '$rootScope', 'Tickets', 'loginService', '$location',
    function ($scope, $rootScope, Tickets, loginService, $location) {
        'use strict';
        $rootScope.menu_active = 'admin';

        loginService.redirectLogin();


        var userId = loginService.getLoggedInId();
        $scope.isAdmin = loginService.isAdmin(userId);
//        if(!$scope.isAdmin){
//            loginService.actualRedirect = $location.path();
//            $location.path("/login");
//        }
        $scope.tickets =  Tickets.getTickets();
        $scope.setStatus = function(key, status){
            $scope.tickets.$key(key + '/status').$set(status);
        }
    }]);
