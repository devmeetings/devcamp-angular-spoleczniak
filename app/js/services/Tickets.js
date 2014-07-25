spolServices.factory('Tickets', ['$goKey', '$location', function ($goKey, $location) {

    var new_ticket;

    new_ticket = {
        id: null,           // id zgłoszenia
        title: null,        // tytuł zgłoszenia
        description: null,  // opis zgłoszenia
        place: null,        // miejsce zgłoszenia
        status: null        // status zgłoszenia
    };

    return {
        tickets: null,
        getTickets: function () {
            this.tickets = $goKey('tickets');
            this.tickets.$sync();

            return this.tickets;
        },

        addTicket: function (data) {
            this.tickets = this.getTickets();

            this.tickets.$add(data).then(function () {
                $location.path('/tickets');
            });

            return new_ticket;
        }
    }
}]);