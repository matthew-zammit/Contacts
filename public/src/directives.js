angular.module("ContactsApp")
  .value('FieldTypes',{
    text:['Text','Should be text.'],
    email:['Email','Should be email.'],
    date:['Date','Should be date.'],
    datetime:['Date Time','Should be date time.'],
    url:['URL','Should be URL.'],
    email:['Email','Should be email.'],
    number:['Number','Should be number.'],
    time:['Time','Should be time.'],
    month:['Month','Should be month'],
    week:['Week','Should be week'],
    color:['Color','Should be color'],
    tel:['Tel','Should be telephone']
  });


angular.module("ContactsApp")
  .directive("formField", function($timeout,FieldTypes){
    return {
      restrict :'EA',
      templateUrl : 'views/form-field.html',
      replace : true,
      scope : {
        record : '=',
        field : '@',
        live : '@',
        required : '@'
      },
      link : function($scope, element, attr){
        $scope.$on('record:invalid',function(){
          $scope[$scope.field].$setDirty();
        });

        $scope.types = FieldTypes;
        $scope.remove = function(field){
          delete $scope.record[field];
          $scope.blurUpdate();
        };
        $scope.blurUpdate = function(){
          /*
          performs the update if the directive is not a live update
          */

          if ($scope.live !== 'false'){
              $scope.record.$update(function(updatedRecord){
              $scope.record = updatedRecord;
            });
          }
        };
        var saveTimeout;
        $scope.update = function(){
          /*
          Update is invoked when the input is changed
          */
          $timeout.cancel(saveTimeout);
          saveTimeout = $timeout($scope.blurUpdate,1000);
        }
      }
    }
  });

angular.module('ContactsApp')
  .directive('newField', function($filter,FieldTypes){
    return{
      restrict : 'EA',
      templateUrl : 'views/new-field.html',
      replace : true,
      scope :{
        record :'=',
        live : '@'
      },
      require : '^form',

      link : function($scope,element,attr,form){
        $scope.types = FieldTypes;
        $scope.field = {};
        //Show input row for new field
        $scope.show = function(type){
          $scope.field.type = type;
          $scope.display = true;
        };
        //Remove input row
        $scope.remove = function(){
          $scope.field.type = {};
          $scope.display = false;
        };

        $scope.add = function(){
          if (form.newField.$valid){
            $scope.record[$filter('camelCase')($scope.field.name)]  = [$scope.field.value, $scope.field.type];
            $scope.remove();
            if ($scope.live !== 'false') {
              $scope.record.$update(function (updatedRecord) {
              $scope.record = updatedRecord;
            });
          }
          }
        };
      }
    };
  });
