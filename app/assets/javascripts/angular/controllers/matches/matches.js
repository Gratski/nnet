(function(){

  angular.module('social').controller('matches', ['$scope', '$http', '$window', 'urlParser', function($scope, $http, $window, urlParser){

    $scope.getPages = function(num) {
        //alert(num)
        var arr = new Array(num);
        var i = 1;
        for(i=1; i<=arr.length; i++){
          arr[i-1] = i
        }
        return arr
    }

    $scope.refresh = function(){
      $scope.page = 1
      $scope.init()
    }

    var get_search_params = function(){
      $http.get('/api/search/params')
      .success(function(data, status, headers, config){
        $scope.searchParams = data
        console.log($scope.searchParams)
        console.log('good')
      })
      .error(function(data, status, headers, config){
        $scope.searchParams = null
        console.log('good')
      })
    }

    //set filtering painel to hidden
    $scope.filtering = false
    $scope.showFilter = function(){
      if ($scope.filtering)
      {
        $scope.filtering = false
      }else{
        $scope.filtering = true
      }
    }

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
    $scope.pagination.count = 0;
    $scope.pagination.per_page = 20
    $scope.number_of_pages = Math.ceil( $scope.pagination.count / $scope.pagination.per_page )
   

    //obtaining params
    $scope.params = urlParser.parse($window.location.href)
    if( !$scope.params.page )
      $scope.pagination.cur = 1;
    else
      $scope.pagination.cur = $scope.params.page

    // SEARCH REFRESH AND GET RESULTS
    var search = function(){
      var offset = ($scope.pagination.cur - 1) * $scope.pagination.per_page
      $scope.searching = true
      $http.get('/api/search/'+ offset +'/'+$scope.pagination.per_page)
      .success(function(data, status, headers, config){
        console.log('SEARCH RESULTS')
        console.log(data)
        $scope.searching = false
        $scope.matches.list = data
      })
      .error(function(data, status, headers, config){
        console.log('SEARCH ERROR')
        $scope.searching = false
      })
    }
    var search_count = function(){
      $scope.pagination.count = 0;
      $http.get('/api/search/count')
      .success(function(data, status, headers, config){
        console.log('count')
        console.log(data)
        $scope.pagination.count = data
      })
      .error(function(data, status, headers, config){
        console.log('error counting...')
        $scope.pagination.count = 0;
      })
    }

    //BLUR
    $scope.setBlurOrNot = function(match){
      if (match.friends)
        return ''
      else
        return 'blur'
    }


    //MESSAGES
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
            alert('found!')
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
      get_search_params()
      search_count()
      search()
    }

    //initializing
    $scope.init()

  }])


}())