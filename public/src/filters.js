angular.module('ContactsApp')
  .filter('labelCase', function(){
    return function(input){
      input = input.replace(/([A-Z])/g,' $1');
      return input[0].toUpperCase() + input.slice(1);
    };
  });

angular.module('ContactsApp').filter('filterKey', function(){
  return function(object, query){
    var result = {};
    angular.forEach(object,function(value,key){
      if(key !== query){
        result[key] = value;
      }
    });
    return result;
  }
});
angular.module('ContactsApp').filter('camelCase', function(){
  return function(input){
    //Field Name -> fieldName
    return input.toLowerCase().replace(/( \w)/g,function(match, letter){
      return letter.toUpperCase();
    });
  };
});
