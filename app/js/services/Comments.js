spolServices
.factory('Comments', ['$goKey', '$location', '$goQuery', 'loginService', function ($goKey, $location, $goQuery, loginService) {

    var newComment;

    newComment = {
        id: null,                 // id komentarza
        ticketId: null,           // id zgłoszenia
        author: null,             // autor komentarza
        comment: null,            // treść komentarza
        plusCounter: 0,           // ilość plusów 
        minusCounter: 0           // ilość minusów
    };

    return {
        comments: null,

        getComments: function (id) {
            console.log(id);
            
            this.comments = $goQuery('comments', { ticketId: parseInt(id, 10) }, { limit: 100 });
            this.comments.$sync();

            return this.comments;            
        },

        addComment: function (data) {
            var userId = loginService.getLoggedInId();

            this.comments = this.getComments();

            data.id = new Date().getTime();
            data.author = loginService.getUsernameById(userId);

            this.comments.$add(data);
        },

        getBlankComment: function () {
            return Object.create(newComment);
        }
    }
}]);