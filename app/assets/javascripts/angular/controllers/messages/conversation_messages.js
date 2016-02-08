(function(){

  var controller = function($scope, $http, $window, $routeParams){

    $scope.limit = 10

    $scope.init = function(conversation, messages){

      $scope.conversation = conversation
      $scope.messages = messages
      
    }

    $scope.send = function(conversation, from){
      $http.post('/api/messages', {conversation_id: conversation, user_id: from, body: $scope.message})
      .success(function(data, status, headers, config){
        $scope.messages.push({user_id: from, body: $scope.message})
        $scope.message = ''
      })
      .error(function(data, status, headers, config){
        alert('not sent...')
      })
    }
  
    $scope.load_more = function(){
      $http.get('/api/messages/'+ $scope.conversation.id + '/' + $scope.messages.length + '/' + $scope.limit)
      .success(function(data, status, headers, config){
        var i;
        for(i = 0; i < data.msgs.length; i++){
          $scope.messages.splice(0, 0, data.msgs[i])
        }
      })
      .error(function(data, status, headers, config){
        alert('error')
      })
    }

    $scope.back = function(){
      $window.history.back()
    }

    $scope.idd = $routeParams.messagesId

  }

  controller.$inject = ['$scope', '$http', '$window', '$routeParams']

  angular.module('social').controller('conversation', controller)
}())