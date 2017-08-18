angular.module('app.controllers', [])

.controller('gearListCtrl', ['$scope', '$stateParams', '$http', 'Abilities', 'Favourites', 'Database',
function ($scope, $stateParams, $http, Abilities, Favourites, Database) {
	$scope.Abilities = {
		all : Abilities.all,
		subs: Abilities.subs
	};
	
	$scope.input = {
		Type: 'Any',
		Brand: 'Any',
		Ability:'Any',
		Main: 'Any',
		Sub: 'Any',
		Toggle: false,
		Favourite: false
	};
	
	$scope.gears = [];
	
	$scope.searchFilter = function(gear){
		var result = true;
		
		var any = {
			Type :  $scope.input.Type.localeCompare('Any') == 0,
			Brand:   $scope.input.Brand.localeCompare('Any') == 0,
			Ability:  $scope.input.Ability.localeCompare('Any') == 0,
			Main:  $scope.input.Main.localeCompare('Any') == 0,
			Sub:    $scope.input.Sub.localeCompare('Any') == 0
		};
		
		if($scope.input.Favourite && !$scope.favourites[gear.code])return false;
		
		if(gear.type != $scope.input.Type && !any.Type){
			result = false;
		}
		
		if(gear.Brand != $scope.input.brand && !any.Brand){
			result = false;
		}
		
		if($scope.input.Toggle){
			if(gear['main'] != $scope.input.Main && !any.Main  )result = false;
			if(gear['likely_sub'] != $scope.input.Sub && !any.Sub)return false;
		}else{
			if(($scope.input.Ability != gear['main'] && $scope.input.Ability != gear['likely_sub']) && !any.Ability ){
				// console.log($scope.input.Ability, gear)
				result = false;
			}
		}
		
		return result;
		
	};
	
	// Database.getCollection('/gear').$loaded(gears=>{
	// 	$scope.gears = gears;
	// 	console.log($scope.gears);
	// });
	//
	$http.get('../data/gear.json').then(function(res){

		// var obj = {};
		// res.data.forEach(function(gear, index){
		// 	var id = index +1;
		// 	var str = id+"";
		// 	var str2 = "G" + str.padStart(3, '0');
		// 	gear.id = str2;
		// 	obj[str2] = gear;
		// });
		// console.log(JSON.stringify(obj));
		$scope.gears = res.data;
	});

	Favourites.load();
	$scope.favourites = Favourites.get();
	
	$scope.addFavourite = function(id){
		Favourites.add(id);
		$scope.favourites = Favourites.get();
	};
	
	$scope.removeFavourite = function(id){
		Favourites.remove(id);
		$scope.favourites = Favourites.get();
	}
}])
   
.controller('kitOptimizerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('brandsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', 'Database', 'ServiceWorker',
function ($scope, $stateParams, Database, ServiceWorker) {
	$scope.current = ServiceWorker.getVersion();

	$scope.latest = {};
	
	Database.get('/latest',data=>{
		$scope.latest = data.val();
	});
	
	$scope.update = ()=>{
		ServiceWorker.update();
		window.location.reload(true);
	}

}])

.controller('favouritesCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {
	
	// $scope.favourites = favourties.get();
	
}]);
