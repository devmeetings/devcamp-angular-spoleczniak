spolServices.factory('Tickets', ['$goKey', '$goQuery', '$location', function ($goKey, $goQuery, $location) {

    var new_ticket;

    new_ticket = {
        idticket: '',           // id zgłoszenia
        title: '',        // tytuł zgłoszenia
        description: '',  // opis zgłoszenia
        place: '',        // miejsce zgłoszenia
        status: 1        // status zgłoszenia
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
            this.getTickets();
            data.idticket = new Date().getTime();
            this.tickets.$add(data).then(function () {
                $location.path('/tickets');
            });
        },

        getTicket: function (id) {
            this.ticket = $goQuery('tickets', { idticket: parseInt(id, 10) }, { limit: 1 });
            this.ticket.$sync();
            return this.ticket;
        },

        getBlankTicket: function () {
            return Object.create(new_ticket);
        }
    }
}]);