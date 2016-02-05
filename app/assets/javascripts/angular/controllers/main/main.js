(function(){

  var controller = function($scope){
    $scope.username = 'Nome de user'
  }

  angular.module('social').controller('main', controller);

}())