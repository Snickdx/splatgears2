function noop(){

}

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
	})
	
	.factory('ServiceWorker', ()=>{
		const scope = './';
		
		let service = {};
		
		service.sw = null;
		
		service.syncManager = null;
		
		service.pushManager = null;
		
		service.registration = null;
		
		service.getRegistration = (success, failure) => {
			success = success || noop;
			failure = failure || noop;
			
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
		
		service.register = (success, failure) => {
			success = success || noop;
			failure = failure || noop;
			
			if ('serviceWorker' in navigator) {
				window.addEventListener('load', () => {
					navigator.serviceWorker.register(
						'service-worker.js',
						{scope: scope}
					)
						.then(reg => {
							service.registration = reg;
							service.syncManager = reg.sync;
							service.pushManager = reg.pushManager;
							service.sw = reg.installing;
							
							reg.onupdatefound = () => {
								reg.installing.onstatechange = function() {
									if (navigator.serviceWorker.controller) {
										console.log('New or updated content is available.');
									} else {
										console.log('Content is now available offline!');
									}
								};
							};
							
							fetch('https://snickdx.firebaseio.com/latest.json').then(resp=>{
								if(typeof(Storage) !== undefined){
									resp.text().then(text=>{
										localStorage.setItem("ngStorage-sg_version", text);
									});
								}
							});
							
							success();
							
							return navigator.serviceWorker.ready;
							
						})
						.catch(e => {
							console.error("Error installing service worker", e)
						});
				});
				
			}else {
				console.error("Service Worker not supported!");
			}
			
		};
		
		service.update = () => {
			service.getRegistration(reg=>{
				reg.update();
				console.log('updated');
			});
		};
		
		service.isOutdated = () => {
			return false;
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
	
}]);