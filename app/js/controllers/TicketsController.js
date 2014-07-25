spolControllers.controller('TicketsListController', ['$scope', '$rootScope', 'Tickets',
    function ($scope, $rootScope, Tickets) {
        'use strict';

        // pobieranie listy zgłoszeń
        $scope.tickets = Tickets.getTickets();

    }]);

spolControllers.controller('TicketAddController', ['$scope', '$rootScope', 'Tickets',
    function ($scope, $rootScope, Tickets) {
        'use strict';

        // utworzenie pustego obiektu nowego zgłoszenia
        $scope.new_ticket = Tickets.getBlankTicket();

        // dodawanie nowego zgłoszenia
        $scope.addNewTicket = function ($event) {
            $event.preventDefault();

            Tickets.addTicket($scope.new_ticket);
        };
    }]);


spolControllers.controller('TicketShowController', ['$scope', '$rootScope', 'Tickets', '$routeParams',
    function ($scope, $rootScope, Tickets, $routeParams) {
        'use strict';

        // utworzenie pustego obiektu nowego zgłoszenia
        $scope.ticket = Tickets.getTicket($routeParams.id);
    }]);
