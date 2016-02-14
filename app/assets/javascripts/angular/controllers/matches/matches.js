(function(){

  angular.module('social').controller('matches', ['$scope', '$http', '$window', 'urlParser', function($scope, $http, $window, urlParser){

    $scope.loader             = {}
    $scope.loader.looking_for = false
    $scope.loader.location    = false
    $scope.loader.age         = false

    $scope.cities = []
    $scope.selectedCity;
    $scope.countries = []
    $scope.selectedCountry;

    //scroll listener
    window.onscroll   = function(){infinitScroll()}
    var infinitScroll = function(){
      var doc       = document.documentElement
      var scrolled  = doc.scrollTop
      var maxScroll = doc.scrollTopMax
      if (Math.abs(scrolled - maxScroll) < 20)
        search()
    }

    //set filtering painel to hidden
    $scope.filtering  = false
    $scope.showFilter = function(){
      if ($scope.filtering)
      {
        $scope.filtering = false
      }else{
        $scope.filtering = true
      }
    }

    /////////////////////FILTER////////////////////////
    jq('html').click(function(event){
      //hide the location search
      if( !jq(event.target).is('#country-dropdown') && !jq(event.target).closest('#country-dropdown').length && !jq(event.target).is('#city') && !jq(event.target).is('#country') )
        jq('#country-dropdown').slideUp()
      //hide the age range
      if( !jq(event.target).is('#age-dropdown') && !jq(event.target).closest('#age-dropdown').length && !jq(event.target).is('#age'))
        jq('#age-dropdown').slideUp()

    })
    $scope.showSelectLocation = function(){
      jq('#country-dropdown').show()
    }
    $scope.showSelectRange = function(){
      jq('#age-dropdown').show()
    }
    var get_countries = function(){
      //set loader
      $http.get('/api/locations/country')
      .success(function(data, status, headers, config){
        $scope.countries = data
        $scope.cities = []
        $scope.selectedCountry = null;
        $scope.selectedCity = null;
        console.log('done!')
      })
      .error(function(data, status, headers, config){
        $scope.countries = []
      })
    }
    $scope.get_cities = function(country_id){
      $scope.selectedCountry = country_id;
      $http.get('/api/locations/country/'+country_id)
      .success(function(data, status, headers, config){
        $scope.cities = data
      })
      .error(function(data, status, headers, config){
        $scope.cities = []
      })
    }
    $scope.selectCity = function(city_id){
      $scope.selectedCity = city_id
    }
    ///////////////////////////////////////////////////

    /////////////////////SEARCH////////////////////////
    $scope.matches       = {}
    $scope.matches.total = 0
    $scope.matches.list  = []
    var search = function(){
      var offset = $scope.matches.list.length
      $scope.searching = true
      $http.get('/api/search/'+ offset +'/20')
      .success(function(data, status, headers, config){
        console.log('SEARCH RESULTS')
        console.log(data)
        $scope.searching = false
        $scope.matches.list = $scope.matches.list.concat(data)
      })
      .error(function(data, status, headers, config){
        console.log('SEARCH ERROR')
        $scope.searching = false
      })
    }
    var search_count = function(){
      $http.get('/api/search/count')
      .success(function(data, status, headers, config){
        $scope.numResults = data
      })
      .error(function(data, status, headers, config){
        console.log('error counting...')
      })
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

    //UPDATE
    $scope.updateLookingFor = function(newValue){
      $http.put('/api/search', {looking_for: newValue})
      .success(function(data, status, headers, config){
        $scope.matches.list = []
        search()
        $scope.searchParams.looking_for = newValue
      })
      .error(function(data, status, headers, config){
        $scope.errors.error = 'Oops... something went wrong'
      })
    }
    $scope.updateLocation = function(){

      var obj = {}
      if( $scope.selectedCity != null )
        obj.city_id = $scope.selectedCity
      if( $scope.selectedCountry != null )
        obj.country_id = $scope.selectedCountry
      if( !$scope.selectedCountry && !$scope.selectedCity )
        return;

      $http.put('/api/search', obj)
      .success(function(data, status, headers, config){
        $scope.matches.list = []
        search()
        console.log('good!')
        jq('#country-dropdown').slideUp()
      })
      .error(function(data, status, headers, config){
        $scope.errors.error = 'Oops... something went wrong'
        console.log('error')
      })
    }
    $scope.updateAge = function(){
      if (!$scope.searchParams.min_age || !$scope.searchParams.max_age)
        return;
      var obj = {}
      obj.min_age = $scope.searchParams.min_age
      obj.max_age = $scope.searchParams.max_age
      $http.put('/api/search', obj)
      .success(function(data, status, headers, config){
        jq('#age-dropdown').slideUp()
        search()
        console.log('good age!')
      })
      .error(function(data, status, headers, config){
        console.log('error updating age')
      })
    }
    ///////////////////////////////////////////////////


    /////////////////////BLUR OR NOT////////////////////////
    $scope.setBlurOrNot = function(match){
      if (match.friends)
        return ''
      else
        return 'blur'
    }
    ////////////////////////////////////////////////////////

    
    /////////////////////MESSAGES////////////////////////////
    $scope.message              = {}
    $scope.message.to;
    $scope.message.body;
    $scope.message.sending      = false
    $scope.message.confirmation = false
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
    ////////////////////////////////////////////////////////


    /////////////////////PUNCHES////////////////////////////
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
    ////////////////////////////////////////////////////////


    /////////////////////////////////////////////
    //init method
    $scope.init = function(){
      get_countries()
      get_search_params()
      search_count()
      search()
    }

    //initializing
    $scope.init()

  }])


}())