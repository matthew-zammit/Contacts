angular.module('ContactsApp',['ngRoute','ngResource','ngMessages'])
  .config(function($routeProvider, $locationProvider){
      $routeProvider
      .when('/contacts',
        {
          controller: 'ListController',
          templateUrl: 'views/list.html'
        })
        .when('/contact/new',{
          controller:'NewContactController',
          templateUrl:'views/newContact.html'
        })
        .when('/contact/:id', {
          controller: 'ContactController',
          templateUrl: 'views/contact.html'
        });

      $locationProvider.html5Mode(true);
  });
