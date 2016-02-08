(function(){

  var controller = function($scope, $http, $window){

    $scope.init = function(){

      $http.get('/api/messages')
      .success(function(data, status, headers, config){
        $scope.conversations = data
        console.log(data)
      })
      .error(function(data, status, headers, config){
        alert('oops..')
      })
    }

    //Delete a conversation
    $scope.delete_conversation = function(conversation_id){

      $http.delete('/api/messages/' + conversation_id)
      .success(function(data, status, headers, config){
        $scope.remove_from_conversations(conversation_id)
      })
      .error(function(data, status, headers, config){
        alert('not deleted')
      })
    }


    //AUX METHODS
    $scope.remove_from_conversations = function(id){
      var i = 0;
      for(i = 0; i < $scope.conversations.length; i++)
      {
        if( $scope.conversations[i].id == id ){
          $scope.conversations.splice(i, 1)
          break;
        }
      }
    }

    $scope.init()

  }

  angular.module('social').controller('messages', controller)
}())