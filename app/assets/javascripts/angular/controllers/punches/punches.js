(function(){

  var controller = function($scope, $http, $window){

    //CURRENT VIEW
    $scope.view = 'my_punches'

    //MY_PUNCHES tab
    $scope.my_punches = {}
    $scope.my_punches.list = []
    $scope.my_punches.offset = 0

    //PUNCHED ME tab
    $scope.punched_me = {}
    $scope.punched_me.list = []
    $scope.punched_me.offset = 0

    $scope.get_my_punches = function(){

      $http.get('/api/punches/0/10')
      .success(function(data, status, headers, config){
        console.log('good my punches')
        console.log(data)
        $scope.my_punches.list = data
      })
      .error(function(data, status, headers, config){
        alert('error')
      })

    }

    $scope.get_punched_me = function(){

      $http.get('/api/punched/0/10')
      .success(function(data, status, headers, config){
        console.log('good punched me')
        console.log(data)
        $scope.punched_me.list = data
      })
      .error(function(data, status, headers, config){
        alert('error')
      })

    }

    $scope.punch_back = function(user_id){



    }

    $scope.unpunch = function(user_id){

      $http.delete('/api/punch/' + user_id)
      .success(function(data, status, headers, config){
        alert('good')
      })
      .error(function(data, status, headers, config){
        alert('error')
      })

    }

    //init
    $scope.get_my_punches()
    $scope.get_punched_me()

  }

  controller.$inject = ['$scope', '$http', '$window']

  angular.module('social').controller('punches', controller)
}())