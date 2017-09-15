/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Initialize Firebase
const config = {
	apiKey: "AIzaSyBEAicGCD8RDOr3yiNfSqiQtdTB-VKz-3s",
	authDomain: "snickdx.firebaseapp.com",
	databaseURL: "https://snickdx.firebaseio.com",
	projectId: "snickdx",
	storageBucket: "snickdx.appspot.com",
	messagingSenderId: "995660027416"
};
firebase.initializeApp(config);


/***/ }),
/* 2 */
/***/ (function(module, exports) {


angular.module('app.services', [])
	
	.factory('Abilities',function(){
		return {
			headgear: [
				"Any",
				"Bomb Defense Up",
				"Cold-Blooded",
				"Comeback",
				"Ink Recovery Up",
				"Ink Resistance Up",
				"Ink Saver (Main)",
				"Ink Saver (Sub)",
				"Last-Ditch Effort",
				"Opening Gambit",
				"Quick Respawn",
				"Quick Super Jump",
				"Run Speed Up",
				"Special Charge Up",
				"Special Power Up",
				"Special Saver",
				"Sub Power Up",
				"Swim Speed Up",
				"Tenacity"
			],
			clothing: [
				"Any",
				"Ability Doubler",
				"Bomb Defense Up",
				"Cold-Blooded",
				"Haunt",
				"Ink Recovery Up",
				"Ink Resistance Up",
				"Ink Saver (Main)",
				"Ink Saver (Sub)",
				"Ninja Squid",
				"Quick Respawn",
				"Quick Super Jump",
				"Respawn Punisher",
				"Run Speed Up",
				"Special Charge Up",
				"Special Power Up",
				"Special Saver",
				"Sub Power Up",
				"Swim Speed Up",
				"Thermal Ink"
			],
			shoes: [
				"Any",
				"Bomb Defense Up",
				"Cold-Blooded",
				"Ink Recovery Up",
				"Ink Resistance Up",
				"Ink Saver (Main)",
				"Ink Saver (Sub)",
				"Quick Respawn",
				"Quick Super Jump",
				"Run Speed Up",
				"Special Charge Up",
				"Special Power Up",
				"Special Saver",
				"Sub Power Up",
				"Swim Speed Up",
				"Drop Roller",
				"Object Shredder",
				"Stealth Jump"
			],
			subs: [
				"Any",
				"Bomb Defense Up",
				"Cold-Blooded",
				"Ink Recovery Up",
				"Ink Resistance Up",
				"Ink Saver (Main)",
				"Ink Saver (Sub)",
				"Quick Respawn",
				"Quick Super Jump",
				"Run Speed Up",
				"Special Charge Up",
				"Special Power Up",
				"Special Saver",
				"Sub Power Up",
				"Swim Speed Up"
			],
			all:[
				"Any",
				"Ability Doubler",
				"Bomb Defense Up",
				"Cold-Blooded",
				"Comeback",
				"Drop Roller",
				"Haunt",
				"Ink Recovery Up",
				"Ink Resistance Up",
				"Ink Saver (Main)",
				"Ink Saver (Sub)",
				"Last-Ditch Effort",
				"Ninja Squid",
				"Object Shredder",
				"Opening Gambit",
				"Quick Respawn",
				"Quick Super Jump",
				"Respawn Punisher",
				"Run Speed Up",
				"Special Charge Up",
				"Special Power Up",
				"Special Saver",
				"Stealth Jump",
				"Sub Power Up",
				"Swim Speed Up",
				"Tenacity",
				"Thermal Ink"
			]
		};
	})

	.factory('Favourites', function($localStorage){
		var service = {};
		
		service.favourites = $localStorage.favourites === undefined ? {} : $localStorage.favourites;
		
		service.get = function(){
			return service.favourites;
		};
		
		service.check = function(id){
			return service.favourites[id] !== undefined;
		};
		
		service.add = function(id){
			service.favourites[id] = true;
			$localStorage.favourites = service.favourites;
		};
		
		service.remove = function(id){
			service.favourites[id] = undefined;
		};
		
		return service;
	})
	
	.factory('ServiceWorker', ($localStorage, $http)=>{
		const scope = './';
		
		let service = {};
		
		service.sw = null;
		
		service.syncManager = null;
		
		service.pushManager = null;
		
		service.registration = null;
		
		service.getRegistration = (success, failure) => {
			success = success || (()=>{})();
			failure = failure || (()=>{})();
			
			navigator.serviceWorker.getRegistration(scope).then(reg => {
				success(reg);
			}).catch(err => {
				failure(err);
			});
			
		};
		
		service.getNotifications = () => {
			return service.registration.getNotifications();
		};
		
		service.update = () => {
			service.registration.update()
		};
		
		service.showNotification = notification => {
			if(service.registration == null){
				console.log('registration is null')
			}else{
				service.registration.showNotification('Vibration Sample', {
					body: 'Buzz! Buzz!',
					icon: '../img/pieman-192.png',
					badge: '../img/pieman-128.png',
					vibrate: [200, 100, 200, 100, 200, 100, 200],
					tag: 'vibration-sample'
				});
			}
		};
		
		service.registerSync = (syncName) => {
			navigator.serviceWorker.ready.then(reg => {
				reg.sync.register(syncName);
				console.log(`${syncName} registered`);
			});
		};
		
		service.register = (callback) => {
			
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', async () => {
					let reg = await navigator.serviceWorker.register('service-worker.js', {scope: scope});
					try{
						service.registration = reg;
						service.syncManager = reg.sync;
						service.pushManager = reg.pushManager;
						service.sw = reg.installing;
						
						reg.onupdatefound = () => {
							reg.installing.onstatechange = function () {
								if (navigator.serviceWorker.controller) {
									console.log('New Version Detected');
								} else {
									console.log('Content is now available offline!');
								}
							};
						};
						callback(reg);
						return navigator.serviceWorker.ready;
						
					}catch(e){
						console.error("Error installing service worker", e)
					}
				});
				
			}else {
				console.error("Service Worker not supported!");
			}
			
		};
		
		service.update = (callback) => {
			service.getRegistration(reg=>{
				reg.update(reg);
				console.log('updated');
				callback(reg);
			});
		};
		
		service.isOutdated = () => {
			return false;
		};
		
		service.getVersion = () =>{
			if(service.version != undefined)return service.version;
			service.version = $localStorage['sg_version'];
			return service.version;
		};
		
		return service;
	})
	
	.factory('Database', ['$firebaseArray', '$firebaseObject', ($firebaseArray, $firebaseObject)=>{
	
		let service = {};
		const db = firebase.database();
		
		service.set = function(child, data){
			db.ref(child).set(data);
		};
		
		service.get = (child, callback) =>{
			db.ref(child).once("value").then(function(snapshot){
				callback(snapshot);
			});
		};
		
		service.getList = function(child){
		
		};
		
		service.getTimeRef = ()=>{
			return firebase.database.ServerValue.TIMESTAMP;
		};
		
		service.onConChange = callback => {
			db.ref(".info/connected").on("value", snap=>{
				callback(snap.val());
			});
		};
		
		service.getTimeOffset = callback =>{
			db.ref(".info/serverTimeOffset").on("value", snap => {
				callback(snap.val());
			});
		};
		
		service.onChange = function(child, type, callback){
			db.ref(child).on(type, snapshot => {
				callback(snapshot);
			});
		};
		
		service.update = function(child, obj){
			return db.ref(child).update(obj);
		};
		
		service.getOrderedbyLast = function(child, prop, num){
			return db.ref(child).orderByChild(prop).limitToLast(num);
		};
		
		service.pushKey = (child) => {
			return db.ref(child).push();
		};
		
		service.push = function(child, data){
			return db.ref(child).push().set(data);
		};
		
		service.getCollection = function(child){
			return $firebaseArray(db.ref(child));
		};
		
		service.getObject = function(child){
			return $firebaseObject(db.ref(child));
		};
		
		return service;
	
	}])

	.factory('Optimizer', (Gear, Abilities, Webworker) =>{
		let service = {};
		
		function getKits(selection, filteredGears, Abilities){
			
			/**
			 * @desc  takes a kit and selected abilities and returns amt of selected abilities NOT in the kit
			 * @param {int[]} kitVector - 1st element: selected headgear, 2nd : selected clothing, 3rd : selected shoes
			 * @param {int[]} selectedAbilities - abilities specified by user
			 * @param  gears - contains all gears with at least 1 of the selected abilities
			 */
			function getRemaining(kitVector, selectedAbilities, gears){
				let types = ["headgear", "clothing", "shoes"];
				let remainingAbilities = selectedAbilities.slice();//creates copy
				selectedAbilities.forEach(abilityIndex=>{
					for(let i=0; i<3; i++){
						if(kitVector[i] !== 0){
							let currentGear = gears[types[i]][kitVector[i]];
							let currentAbility = Abilities.all[abilityIndex];
							let loc = remainingAbilities.indexOf(abilityIndex);
							let abilityAvailable = (loc) => loc > -1;
							if ( currentGear['main'] === currentAbility &&  abilityAvailable(loc)) remainingAbilities.splice(loc, 1);
							loc = remainingAbilities.indexOf(abilityIndex);
							if ( currentGear['likely_sub'] === currentAbility && abilityAvailable(loc)) remainingAbilities.splice(loc, 1);
						}
					}
				});
				return remainingAbilities;
			}
			
			function getHash(arr){
				return `${arr[0]} ${arr[1]} ${arr[2]}`;
			}
			let kits = {};
			let kit;
			let hash;
			
			filteredGears.shoes.forEach((currentShoe, shoeIndex)=>{
				let rem = getRemaining([0, 0, shoeIndex], selection, filteredGears).length;
				if(rem === 0){
					kit = ['G000', 'G000', currentShoe.id];
					hash = getHash(kit);
					kits[hash] = kit;
				}else{
					filteredGears.headgear.forEach((currentHeadgear, headgearIndex)=>{
						let rem = getRemaining([headgearIndex, 0, shoeIndex], selection, filteredGears).length;
						if(rem === 0){
							kit = [currentHeadgear.id, 'G000', currentShoe.id];
							hash = getHash(kit);
							kits[hash] = kit;
						}else if(rem < 3 ) {
							filteredGears.clothing.forEach((currentClothing, clothingIndex) => {
								rem = getRemaining([headgearIndex, clothingIndex, shoeIndex], selection, filteredGears).length;
								if(rem === 0){
									kit = [currentHeadgear.id, currentClothing.id, currentShoe.id];
									hash = getHash(kit);
									kits[hash] = kit;
								}
							})
						}
					})
				}
			});
			
			return kits;
		}
		
		service.generateKits = async (abilities)=>{
			let gears = await Gear.filter(abilities);
			let myWorker = Webworker.create(getKits);
			return myWorker.run(abilities, gears, Abilities);
		};
		
		return service;
	})

	.factory('Gear', ($http, Favourites, Abilities) => {
		let service= {};
		
		let gears = null;
		
		/**
		 * @desc Takes selection and filters out gear that doesn't match at least 1 ability in selection
		 * @param selection array of abilities
		 * @returns {{shoes: [null], headgear: [null], clothing: [null]}} - result set separated by type
		 */
		service.filter = async selection =>{
			if(gears === null)gears = await service.load();
			let hash = {};
			
			let any = {
				id:"G000",
				main: "Any",
				likely_sub:"Any",
				name: "Any",
				type: "-",
				image: "Any.png"
			};
			
			let res = {
				"shoes" : [any],
				"headgear": [any],
				"clothing": [any]
			};
			
			for(let key in gears){
				if(gears.hasOwnProperty(key)){
					let item = gears[key];
					selection.forEach(index=>{
						if((item['main'] === Abilities.all[index] || item['likely_sub'] === Abilities.all[index]) && hash[item.id] !== true){
							res[item['type']].push(item);
							hash[item.id] = true;
						}
					})
				}
			}
			return res;
		};
		
		service.load = async () => {
			let res = await $http.get("data/gear.json");
			gears = res.data;
			for(let key in gears){
				if(gears.hasOwnProperty(key)){
					gears[key].favourite = Favourites.check(key) === true;
				}
			}
			return gears;
		};
		
		service.getAll = async () => {
			if (gears === null)await service.load();
			return gears;
		};
		
		service.get = id => {
			if (id === "G000")
				return {
					id:"G000",
					main: "Any",
					likely_sub:"Any",
					name: "Any",
					type: "-",
					image: "Any.png"
				};
			return gears[id];
		};
		
		return service;
	});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services','ngStorage', 'firebase', 'ngWebworker'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(async function($ionicPlatform, ServiceWorker, $localStorage, $http) {
	
	
	ServiceWorker.register(async reg=>{
		let resp = await $http.get('https://snickdx.firebaseio.com/latest.json');

		if (typeof(Storage) !== undefined) {
			$localStorage["sg_version"] = resp.data;
		}

	});
	
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
	
	
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

angular.module('app.controllers', [])

.controller('gearListCtrl', ['$scope', '$stateParams', '$http', 'Abilities', 'Favourites', 'Gear',
function ($scope, $stateParams, $http, Abilities, Favourites, Gear) {
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
	
	$scope.gears = {};
	
	$scope.filter = function(gear){
	
		let result = true;

		let any = {
			Type :  $scope.input.Type.localeCompare('Any') == 0,
			Brand:   $scope.input.Brand.localeCompare('Any') == 0,
			Ability:  $scope.input.Ability.localeCompare('Any') == 0,
			Main:  $scope.input.Main.localeCompare('Any') == 0,
			Sub:    $scope.input.Sub.localeCompare('Any') == 0
		};

		if($scope.input.Favourite && !$scope.favourites.check(gear.id))return false;


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
				result = false;
			}
		}
		return result;
		
	};
	
	Gear.getAll().then(gear => $scope.gears = gear);
	
	$scope.favourites = Favourites;

}])
   
.controller('kitOptimizerCtrl', ['$scope', 'Abilities', 'Optimizer', 'Gear',
	function ($scope, Abilities, Optimizer, Gear) {
		
		$scope.kits = {};
		
		$scope.selection = [];
		
		$scope.Abilities = Abilities.all;
		
		$scope.input = {
			ability: 0
		};
		
		Gear.load().then(()=>{console.log("loaded gears")});
		
		$scope.get = (id)=>{
			return Gear.get(id);
		};
		
		$scope.addAbility = function(){
			$scope.selection.push($scope.Abilities.indexOf($scope.input.ability));
		};
		
		$scope.genKits = () => {
			Optimizer.generateKits($scope.selection).then(data=>{
				$scope.kits = data;
				console.log(data);
				$scope.$apply();
			});
		};
	
	}
])
   
.controller('brandsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', 'Database', 'ServiceWorker', '$localStorage','$http',
function ($scope, $stateParams, Database, ServiceWorker, $localStorage, $http) {
	$scope.current = $localStorage["sg_version"];

	$scope.latest = Database.getObject('/latest');
	
	$scope.update = ()=>{
		ServiceWorker.update(async reg=>{
			let resp = await $http.get('https://snickdx.firebaseio.com/latest.json');
			
			if (typeof(Storage) !== undefined) {
				$localStorage["sg_version"] = resp.data;
				$scope.current = resp.data;
			}
		});
		window.location.reload(true);
	}

}])

.controller('favouritesCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {
	
	// $scope.favourites = favourties.get();
	
}]);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('menu.gearList', {
    url: '/list',
    views: {
      'side-menu21': {
        templateUrl: 'templates/gearList.html',
        controller: 'gearListCtrl'
      }
    }
  })

  .state('menu.kitOptimizer', {
    url: '/optimizer',
    views: {
      'side-menu21': {
        templateUrl: 'templates/kitOptimizer.html',
        controller: 'kitOptimizerCtrl'
      }
    }
  })

  .state('menu.brands', {
    url: '/brands',
    views: {
      'side-menu21': {
        templateUrl: 'templates/brands.html',
        controller: 'brandsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.favourites', {
    url: '/favourites',
	  views: {
		  'side-menu21': {
			  templateUrl: 'templates/favourites.html',
			  controller: 'favouritesCtrl'
		  }
	  }
  });

$urlRouterProvider.otherwise('/side-menu21/list')


});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map