angular.module('ContactsApp')
  .factory('ContactFactory',function($resource){
    return $resource('/api/contact/:id', {id:'@id'},{
      'update':{method:'PUT'}
    });
});
