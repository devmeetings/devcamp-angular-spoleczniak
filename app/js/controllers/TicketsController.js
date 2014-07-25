spolControllers.controller('TicketsListController', ['$scope', '$rootScope', 'Tickets',
    function ($scope, $rootScope, Tickets) {
        'use strict';

        $rootScope.menu_active = 'tickets';

        // pobieranie listy zgłoszeń
        $scope.tickets = Tickets.getTickets();

    }]);

spolControllers.controller('TicketAddController', ['$scope', '$rootScope', 'Tickets', 'loginService',
    function ($scope, $rootScope, Tickets, loginService) {
        'use strict';

        // sprawdzenie czy jest zalogowany user
        loginService.redirectLogin();
        $rootScope.menu_active = 'add_ticket';

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

        $rootScope.menu_active = 'tickets';

        // utworzenie pustego obiektu nowego zgłoszenia
        $scope.ticket = Tickets.getTicket($routeParams.id);



    }]);
