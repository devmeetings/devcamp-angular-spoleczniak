/*
    Statusy:
    - nowy,
    - zaakceptowany
    - rozwiązany
    - zamknięty

 */

spolControllers.controller('AdminController', ['$scope', '$rootScope', 'Tickets',
    function ($scope, $rootScope, Tickets) {
        'use strict';

        $scope.tickets =  Tickets.getTickets();
        $scope.setStatus = function(key, status){
            $scope.tickets.$key(key + '/status').$set(status);
        }
    }]);
