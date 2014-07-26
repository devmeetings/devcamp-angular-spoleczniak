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


spolControllers.controller('TicketShowController', ['$scope', '$rootScope', 'Tickets', '$routeParams', 'loginService',
    function ($scope, $rootScope, Tickets, $routeParams, loginService) {
        'use strict';

        $rootScope.menu_active = 'tickets';

        $scope.isAdmin = loginService.isAdmin(loginService.getLoggedInId());

        $scope.changeStatus = function(e, id, status){
            e.preventDefault();
            if(!$scope.isAdmin){
                return;
            }
//            console.log($scope.ticket.$$index[0]);
            var key = $scope.ticket.$$index[0];
            $scope.tickets.$key(key + '/status').$set(status);
        }

        // utworzenie pustego obiektu nowego zgłoszenia
        $scope.ticket = Tickets.getTicket($routeParams.id);
        $scope.tickets = Tickets.getTickets();
        $scope.ls = loginService;

    }]);
