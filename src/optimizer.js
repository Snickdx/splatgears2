var fs = require('fs');

const abilities = [
	"Cold-Blooded",
	"Thermal Ink",
	"Respawn Punisher",
	"Special Charge Up",
	"Ink Saver (Sub)",
	"Bomb Defense Up",
	"Quick Respawn",
	"Special Power Up",
	"Run Speed Up",
	"Sub Power Up",
	"Quick Super Jump",
	"Ink Recovery Up",
	"Swim Speed Up",
	"Special Saver",
	"Ink Saver (Main)",
	"Ink Resistance Up",
	"Ninja Squid",
	"Haunt",
	"Ability Doubler",
	"-",
	"Last-Ditch Effort",
	"Opening Gambit",
	"Tenacity",
	"Comeback",
	"Drop Roller",
	"Object Shredder",
	"Stealth Jump"
];

function createMap(){
	var data = JSON.parse(fs.readFileSync('data/gear.json', 'utf8'));
	var map = {
		"headgear":{},
		"clothing":{},
		"shoes":{}
	};
	
	var abilities = [];
	
	data.forEach(item=>{
		
		if(!map[item['type']].hasOwnProperty(item['main']))
			map[item['type']][item['main']] = {};
		
		if(!map[item['type']].hasOwnProperty(item['likely_sub']))
			map[item['type']][item['likely_sub']] = {};
		
		if(!map[item['type']][item['main']].hasOwnProperty(item['likely_sub']))
			map[item['type']][item['main']][item['likely_sub']] = [];
		
		if(!map[item['type']][item['likely_sub']].hasOwnProperty(item['main']))
			map[item['type']][item['likely_sub']][item['main']] = [];
		
		map[item['type']][item['main']][item['likely_sub']].push(item);
		map[item['type']][item['likely_sub']][item['main']].push(item);
		
		if(abilities.indexOf(item['main']) <  0)
			abilities.push(item['main']);
	});
	
	fs.writeFile("map.json", JSON.stringify(map), err=>{
		console.log(err);
	})
	
}

function readMap(){
	return new Promise( resolve => {
		fs.readFile('map.json', (err, data)=>{
			data = JSON.parse(data);
			resolve(data);
		});
	});
}

function readGear(){
	return new Promise( resolve => {
		fs.readFile('data/gear.json', (err, data)=>{
			data = JSON.parse(data);
			resolve(data);
		});
	});
}

filterGears = async (selection) => {
	let gear = await readGear();
	
	let res = {
		"shoes" : [],
		"headgear": [],
		"clothing": []
	};
	
	gear.forEach(item=>{
		selection.forEach(index=>{
			if(item['main'] === abilities[index] || item['likely_sub'] === abilities[index]){
				res[item['type']].push(item);
			}
		})
	});
	console.log(res);
	
	return res;
};



filterGears([1, 4]);
