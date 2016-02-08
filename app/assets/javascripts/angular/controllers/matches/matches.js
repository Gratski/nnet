(function(){

  angular.module('social').controller('matches', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams){

    //Send Message
    $scope.message = {}
    $scope.message.to;
    $scope.message.body;
    $scope.message.sending = false
    $scope.message.confirmation = false

    //attributes
    $scope.matches = {}
    $scope.matches.total = 0
    $scope.matches.list = []

    //pagination
    $scope.pagination = {}
    $scope.pagination.per_page = 20
    $scope.number_of_pages = Math.ceil( $scope.matches.total / $scope.per_page )
    $scope.pagination.cur = $routeParams['page']

    $scope.open_send_message = function(user_id){
      $scope.message.to = user_id
      //open modal
      jq('#sendMessageModal').modal('show')
    }
    $scope.send_message = function(){
      //set loader visible
      $scope.message.sending = true
      //make request
      $http.post('/api/messages', {user_id: $scope.message.to, body: $scope.message.body})
      .success(function(data, status, headers, config){
        alert('Sent!')
        $scope.message.sending = false
        $scope.message.confirmation = true
      })
      .error(function(data, status, headers, config){
        alert('error...')
        $scope.message.sending = false
      })
    }

    $scope.count_matches = function(){

    }

    //get user matches considering the offset and the limit
    $scope.get_matches = function(){
      $http.get('/api/matches/'+ (($scope.pagination.cur - 1) * $scope.pagination.per_page) +'/' + $scope.pagination.per_page)
      .success(function(data, status, headers, config){
        $scope.matches.list = data
      })
      .error(function(data, status, headers, config){
        alert('Oops')
      })
    }

    //punch user
    $scope.punch = function(user_id){
      $http.post('/api/punch', {id: user_id})
      .success(function(data, status, headers, status){

        //update matches list
        var i;
        for(i = 0; i < $scope.matches.length; i++)
        {
          if( matches[i].user.id == user_id )
          {
            matches[i].punched = true
            matches[i].fresh = null
            break;
          }
        }

        alert('good')

      })
      .error(function(data, status, headers, config){
        alert('oops...')
      })
    }

    //punch back a user
    $scope.punch_back = function(user_id){
      $http.post('/api/punch', {id: user_id})
      .success(function(data, status, headers, status){

        //update matches list
        var i;
        for(i = 0; i < $scope.matches.length; i++)
        {
          if( matches[i].user.id == user_id )
          {
            matches[i].punched = true
            matches[i].fresh = null
            break;
          }
        }

        alert('you can now see each others pictures and more!')

      })
      .error(function(data, status, headers, config){
        alert('oops...')
      })
    }

    //open send box for user to send a single message
    $scope.open_send_box = function(){

    }

    // api/users/filters
    $scope.get_user_filters = function(){

    }


    //init method
    $scope.init = function(){
      $scope.count_matches()
      $scope.get_matches()
    }

    //initializing
    $scope.init()

  }])


}())