/*global angular, templates_paths, Modernizr */

var spolApp, spolFilters, spolControllers, spolServices, spolDirectives;


/**
 * Create application modules.
 */
spolApp = angular.module('app', ['app.filters', 'app.controllers', 'app.services', 'app.directives', 'ngRoute', 'goangular']);
spolFilters = angular.module('app.filters', []);
spolControllers = angular.module('app.controllers', []);
spolServices = angular.module('app.services', []);
spolDirectives = angular.module('app.directives', []);


/**
 * Setting router provider config.
 */
spolApp.config(['$routeProvider', '$httpProvider', '$locationProvider', '$goConnectionProvider',
    function ($routeProvider, $httpProvider, $locationProvider, $goConnectionProvider) {
        'use strict';

        $goConnectionProvider.$set('https://goinstant.net/d7a5ec404717/spoleczniak');

        $routeProvider
            // homepage url - searcher
            .when('/dashboard', {
                templateUrl: templates_paths.page_dashboard
            })
            .when('/login', {
                templateUrl: templates_paths.page_login
            })
            .otherwise({
                redirectTo: '/login'
            });

        // change default content-type for $http.post request
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // add header for ajax visibility.
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);