(function(){

  angular.module('social').service('urlParser', ['$http', function($http){

    this.parse = function(url){

      var params = url.split('?')
      //check if has any
      if( params.length == 1 ){return {}}

      var obj = {}
      var arr = params[1].split('&')
      var i;
      for( i=0; i < arr.length; i++ )
      {
        var pre = arr[i].split('=')
        var param = pre[0]
        if(pre.length == 1){
          continue;
        }
        else{
          var value = pre[1]
          obj[param] = value
        }
      }
      return obj;
    }

  }])

}())