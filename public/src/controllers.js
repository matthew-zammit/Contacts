angular.module('ContactsApp').controller('ListController',
  function($scope,$rootScope,ContactFactory,$location){
    $rootScope.PAGE = "all";
    $scope.contacts = ContactFactory.query();
    $scope.fields = ['firstName','lastName'];
    $scope.sort = function(field){
      $scope.sort.field = field;
      $scope.sort.order = !$scope.sort.order;
    };

    $scope.sort.field = 'firstName';
    $scope.sort.order = false;

    $scope.show = function(id){
      $location.url('contact/'+id);
    }

  }
);

angular.module('ContactsApp').controller('NewContactController',
  function($scope,$rootScope ,ContactFactory, $location){
    $rootScope.PAGE = "new";
    $scope.contact = new ContactFactory({
      firstName : ['','text'],
      lastName : ['','text'],
      email : ['','email'],
      homePhone : ['','tel'],
      celPhone : ['','tel'],
      url : ['','url'],
      address : ['','text']
    });

    $scope.save = function(){
      if ($scope.NewContact.$invalid){
        //Invalid form
        $scope.$broadcast('record:invalid');
      }else{
        //Form validated
        $scope.contact.$save();
        $location.url('/contacts');
      }
    };
  });

angular.module('ContactsApp')
  .controller('ContactController',function($scope, $rootScope,$location,ContactFactory, $routeParams ){
    $rootScope.PAGE = "single";
    $scope.contact = ContactFactory.get({id:parseInt($routeParams.id,10)});
    $scope.delete = function(){
      $scope.contact.$delete;
      $location.url('/contacts');
    }
  });
