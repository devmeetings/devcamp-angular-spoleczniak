spolServices
    .factory('Chat', ['$goKey', '$location', '$goQuery', 'loginService', function ($goKey, $location, $goQuery, loginService) {

        var new_message;

        new_message = {
            idmessage: null,                 // id wiadomości
            iduser: null,           // id użytkownika
            text: null,            // treść komentarza
            date: 0           // czas dodania
        };

        return {
            chat: null,

            getMessages: function () {
                var id = loginService.getLoggedInId();
                this.chat = $goQuery('chat', { iduser: id });
                this.chat.$sync();

                return this.chat;
            },

            addMessage: function (data) {
                var id, date;
                id = loginService.getLoggedInId();
                date = new Date();

                data.idmessage = new Date().getTime();
                data.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ', ' + date.getHours() + ':' + date.getMinutes();
                data.iduser = id;

                this.chat.$add(data);
            },

            getBlankMessage: function () {
                return Object.create(new_message);
            }
        }
    }]);