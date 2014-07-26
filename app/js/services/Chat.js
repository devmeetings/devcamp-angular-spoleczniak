spolServices
    .factory('Chat', ['$goKey', '$location', '$goQuery', 'loginService', function ($goKey, $location, $goQuery, loginService) {

        var new_message, withLeadZeroes;

        new_message = {
            idmessage: null,                 // id wiadomości
            iduser: null,           // id użytkownika
            text: null,            // treść komentarza
            date: 0,           // czas dodania
            isAdmin: 0          // czy admin
        };

        withLeadZeroes = function (date) {
            if (date < 10) {
                return '0' + date;
            }
            return date;
        };

        return {
            chat: null,

            getMessages: function () {
                var id = loginService.getLoggedInId();
                console.log(id, typeof id);
                this.chat = $goKey('chat');
                this.chat.$sync();

                return this.chat;
            },

            addMessage: function (data) {
                var id, date;
                id = loginService.getLoggedInId();
                date = new Date();

                data.idmessage = new Date().getTime();
                data.date = date.getFullYear() + '-' + withLeadZeroes(date.getMonth() + 1) + '-' + withLeadZeroes(date.getDate()) + ', ' +
                    withLeadZeroes(date.getHours()) + ':' + withLeadZeroes(date.getMinutes());
                data.iduser = id;
                data.isAdmin = loginService.isAdmin(id);

                this.chat.$add(data);
            },

            getBlankMessage: function () {
                return Object.create(new_message);
            }
        }
    }]);