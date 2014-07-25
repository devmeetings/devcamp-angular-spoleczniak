spolServices.factory('Tickets', ['$goKey', '$goQuery', '$location', 'loginService', function ($goKey, $goQuery, $location, loginService) {

    var new_ticket;

    new_ticket = {
        id: '',           // id zgłoszenia
        title: '',        // tytuł zgłoszenia
        description: '',  // opis zgłoszenia
        place: '',        // miejsce zgłoszenia
        status: 1,        // status zgłoszenia
        userid: 0         // id dodającego usera
    };

    return {
        tickets: null,
        ticket: null,
        getTickets: function () {
            this.tickets = $goKey('tickets');
            this.tickets.$sync();

            return this.tickets;
        },

        addTicket: function (data) {
            var userid = loginService.getLoggedInId();
            if (!userid) {
                $location.path('/tickets');
                return;
            }
            
            this.getTickets();
            data.id = new Date().getTime();
            data.userid = userid;
            this.tickets.$add(data).then(function () {
                $location.path('/tickets');
            });
        },

        getTicket: function (id) {
            this.ticket = $goQuery('tickets', { id: parseInt(id, 10) }, { limit: 1 });
            this.ticket.$sync();
            return this.ticket;
        },

        getBlankTicket: function () {
            return Object.create(new_ticket);
        }
    }
}]);