var app = angular.module("app", ["ngResource"]);
		app.controller("myCtrl", function($scope, $http) {
			$http.get("productsList.json")                         //GET
				.then(function(response){
					$scope.products = response.data;
				});


			$scope.del = function(prId){
				var index = getSelectedId(prId);
				alert(index);
				$scope.products.splice(index, 1);
			}
			$scope.edit = function(prId){
				var index = getSelectedId(prId);
				var products = $scope.products[index]
				$scope.id = products.id;
				$scope.price = products.price;
				$scope.name = products.name;
				$scope.quantity = products.quantity;

			}
			$scope.clickEdit = function(){
				var index = $scope.id;
				var products = $scope.products[index-1]
				products.id = $scope.id;
				products.price = $scope.price;
				products.name = $scope.name;
				products.quantity = $scope.quantity;
			}
			$scope.clickAdd = function(){
				// $scope.products.push({id:$scope.id, name:$scope.name, price:$scope.price, quantity:$scope.quantity});
				var products = $scope.products;
				$http.put("productsList.json",{
			        id:"3", name:"albero", price:"555", quantity:"33"
			    })
			    .then(function (response) {
					if (response.data)
					$scope.msg = "Put Data Method Executed Successfully!";
					}, function (response) {
					$scope.msg = "Service not Exists";
					$scope.statusval = response.status;
					$scope.statustext = response.statusText;
					$scope.headers = response.headers();
				});
			    
			}
			function getSelectedId(prId){
				for(var i=0; i <= $scope.products.length; i++){
					if($scope.products[i].id==prId){
						return i;
					}
				}
				return -1;
			}
		})