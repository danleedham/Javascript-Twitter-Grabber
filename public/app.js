var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUser = function(searchText){
		// console.log("Search string entered: ", searchText);
		TwitterService.getUser(searchText)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
            $scope.results = JSON.parse(data.result.userData);
            // Let's fix us some dates so we can use them
            for(i=0; i<$scope.results.statuses.length; i++){
              $scope.results.statuses[i].created_at_JSDate = new Date($scope.results.statuses[i].created_at);
            }
            // console.log($scope.results);
		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
  }
 
});

app.factory('TwitterService', function($http, $q){
  
  var getUser = function(searchText){
    var d = $q.defer();
    $http.post('/twitter/search', {searchText : searchText})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }
});