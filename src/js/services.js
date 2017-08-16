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
		
		service.favourites = {};
		
		service.get = function(){
			return service.favourites;
		};
		
		service.load = function(){
			service.favourites = $localStorage.favourites ? JSON.parse($localStorage.favourites) : {};
		};
		
		service.add = function(id){
			service.favourites[id] = true;
			service.save();
		};
		
		service.save = function(){
			$localStorage.favourites = JSON.stringify(service.favourites);
		};
		
		service.remove = function(id){
			service.favourites[id] = undefined;
			service.save();
		};
		
		return service;
	});