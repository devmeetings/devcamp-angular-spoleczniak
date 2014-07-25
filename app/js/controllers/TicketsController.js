spolControllers.controller('TicketsController', ['$scope', '$rootScope', 'Tickets',
    function ($scope, $rootScope, Tickets) {
        'use strict';

        $scope.tickets = Tickets.getTickets();


    }]);
