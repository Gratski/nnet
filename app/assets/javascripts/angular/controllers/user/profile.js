(function(){

  angular.module('social').controller('profile', ['$scope', '$http', '$window', function($scope, $http, $window) { 
        //your minsafe controller
        $scope.user = {}
        $scope.user.details;
        $scope.user.pictures = []

        $scope.message = ""

        $scope.loader = {}
        $scope.loader.action = false

        $scope.init = function(user, pictures){
          $scope.user.details = user
          $scope.user.pictures = pictures
        }

        $scope.showSendMessageModal = function(){
          jq('#punchBackModal').modal('hide')
          jq('#sendMessageModal').modal('show')
        }


        //simple punch function
        $scope.punch = function(user_punched_id)
        {
          $scope.loader.action = true
          $http.post('/api/punch', {id: user_punched_id})
          .success(function(data, status, headers, config){
            $scope.loader.action = false
            $scope.punched = true
          })
          .error(function(data, status, headers, config){
            alert("oops...")
            $scope.loader.action = false
          })
        }
        $scope.punchBack = function(user_punched_id){
          $scope.loader.action = true
          $http.post('/api/punch', {id: user_punched_id})
          .success(function(data, status, headers, config){
            $scope.friends = true
            $scope.loader.action = false
            jq('#punchBackModal').modal('show')
          })
          .error(function(data, status, headers, config){
            alert('oops...')
            $scope.loader.action = false
          })
        }

        //send message
        $scope.sendMessage = function(user_id){
          if( $scope.message.length < 1 )
          {
            $scope.messageError = true
            $scope.messageErrorTxt = "Message cannot be blank"
            alert('oops blank')
            return;
          }
          $http.post('/api/messages', {user_id: user_id, body: $scope.message})
          .success(function(data, status, headers, config){
            $scope.messageConfirmation = true
            $scope.message = ""
            jq('#sendMessageModal').modal('hide')
          })
          .error(function(data, status, headers, config){
            alert('oops error...')
            console.log(data)
          })
        }
  }]);

  
}())