var app = angular.module("app", []);
		app.service('MyService', ['$http', function ($http) {
		  function all() {
		    return $http.get("http://localhost:3000/posts");
		  }
		   return {
		    all: all
		  }
		}]);

	app.controller("myCtrl",['$scope', '$http', 'MyService', function($scope, $http, MyService) {
		
	  MyService.all().then(function (data) {
	    $scope.posts = data;
	    	console.log( $scope.posts);
	    // init further handling of `.data` here.
	  });
		// if(inArray($scope.posts.author, 'autor')==1){
		// 	alert('jest')
		// }
		// function inArray(array, value) {
  //       	return array.indexOf(value) !== -1;
		// };


		$scope.add = function(){
			$http.post("http://localhost:3000/posts", {
				title:$scope.newTitle,
				author:$scope.newAuthor
			})
			.then(function(data) {
			    console.log(data.data);
			    console.log($scope.posts)
			    $scope.posts.push({title:$scope.newTitle, author:$scope.newAuthor});
			    console.log($scope.posts)
			    $scope.newPost = {}
		})}
		$scope.delete = function(id){
			$http.delete("http://localhost:3000/posts/" + id)
			.then(function(data){
				var index = getSelectedId(id);
				$scope.posts.splice(index, 1);
			})
		}
			console.log($scope.posts)
		
		$scope.edit = function(post){
			var index = getSelectedId(post.id);
			var post = $scope.posts[index]
			id = post.id;
			title = post.title;
			author = post.author;
			newTitle = $scope.newTitle;
			newAuthor = $scope.newAuthor
			$http.put("http://localhost:3000/posts/" + id, {
				title:newTitle,
				author:newAuthor
			}).then(function(){
				$scope.posts[index].title = newTitle;
				$scope.posts[index].author = newAuthor
			})
		}
		$scope.edytuj = function(post){
			var index = getSelectedId(post.id);
			var post = $scope.posts[index]
			console.log($scope.posts[0])
			$scope.all = post;
			$scope.newTitle = post.title;
			$scope.newAuthor = post.author;
		}
		function getSelectedId(index){
			for(var i=0; i<=$scope.posts.length; i++){
				if($scope.posts[i].id==index)
					return i;
			}
		}

		$scope.variable = "zmienna";

	}])