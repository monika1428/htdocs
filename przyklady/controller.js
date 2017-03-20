var AppServices = angular.module('AppServices', ['ngResource'])
AppServices.factory('appFactory', function($resource) {
  return $resource('/api/main/actions/:actionid', {}, {
    'update': { method: 'PUT'},
  });
});
var app = angular.module('app', ['ngRoute'], ['AppServices']);
		app.config(function($routeProvider) {
			   $routeProvider
			   .when("/show/:userName", {
			    templateUrl : "main.htmL",
			    controller: 'defaultCtrl'
			  });
			});
		app.factory('UserService', function ($resource, ) {
		      var data = $resource("persons.json", {userName: '@userName'}, {
		      update:{
		          method:'PUT'
		          }
		      });
		      return data;
		});
		app.controller('defaultCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
			$http.get('persons.json').success(function(data){
				$scope.users = data;
				$scope.user_name = $routeParams.userName;
			});
			
			$scope.UserService = UserService;
		
			UserService.update({userName: 1}, {name: 'Saimon', email: 'saimon@devdactic.com'});
		}]);
	