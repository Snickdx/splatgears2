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

async function filterGears(selection){
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
	return res;
}

function printKit(kit, end){

}

function getRemaining(kit, end, selectedAbilities, gears){
	let remainingAbilities = selectedAbilities.slice();//creates copy
	let types = ['headgear', 'clothing', 'shoes'];
	let kitObjs = [];
	
	// console.log("Specified Abilities");
	
	selectedAbilities.forEach(abilityIndex=>{
		// console.log(abilities[abilityIndex]);
		for(let i=0; i<end; i++) {
			
			if (gears[types[i]][kit[i]]['main'] === abilities[abilityIndex] && remainingAbilities.indexOf(abilityIndex) > -1) {
				// console.log(abilities[abilityIndex], 'satisfied');
				remainingAbilities.splice(remainingAbilities.indexOf(abilityIndex), 1);
			}
			if (gears[types[i]][kit[i]]['likely_sub'] === abilities[abilityIndex] && remainingAbilities.indexOf(abilityIndex) > -1) {
				// console.log(abilities[abilityIndex], 'satisfied');
				remainingAbilities.splice(remainingAbilities.indexOf(abilityIndex), 1);
			}
			kitObjs.push(gears[types[i]][kit[i]]);
			
		}

	});
	
	// console.log(kitObjs);

	return remainingAbilities.length;
}

//returns 0 if not partial 1 if partial 2 if complete
function getCompletion(kit, end, selectedAbilities, gears){
	
	if(end === 1 )return true;
	
	let remaining = getRemaining(kit, end, selectedAbilities, gears);
	
	if(end === 2)return remaining < 2;
	
	return remaining === 0;
}

function search(selectedAbilities){
	let gears = filterGears(selectedAbilities);
	let k = 0;
	let kits = [];
	let B = [0, 0, 0];
	while(k >= 0){
		while(B[k] < N[k]){
			B[k]++;
			let stage = getCompletion(B, k, selectedAbilities, gears);
			if(stage > 0){
				if ( stage > 1){
					console.log(B);
					kits.push(B);
				}
				k++;
				if(k > N[k])break;
			}
		}
		if(k < B.length)B[k] = 0;
		k--;
	}
	return 0;
}

// function search(B, N, S){
// 	let k = 0;
// 	let kits = [];
// 	while(k >= 0){
// 		while(B[k] < N[k]){
// 			B[k]++;
// 			if(isPartial(B, k, S)){
// 				if ( isComplete(B, k, S)){
// 					console.log(B);
// 					kits.push(B);
// 				}
// 				k++;
// 				if(k > N[k])break;
// 			}
// 		}
// 		if(k < B.length)B[k] = 0;
// 		k--;
// 	}
// 	return 0;
// }

let S =[4, 12];
filterGears(S).then(gears=>{
	let rem = getRemaining([1, 0, 0], 1, S, gears);
	console.log(rem);
});

