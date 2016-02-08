(function(){

  var controller = function($scope, $http, $window, $routeParams){

    $scope.init = function(conversation, messages){

      $scope.conversation = conversation
      $scope.messages = messages
      alert('ghghgs')
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

    $scope.idd = $routeParams.messagesId

  }

  controller.$inject = ['$scope', '$http', '$window', '$routeParams']

  angular.module('social').controller('conversation', controller)
}())