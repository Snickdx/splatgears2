var fs = require('fs');
require('console.table');

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

const types = ['headgear', 'clothing', 'shoes'];

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
	return new Promise( (resolve, reject) => {
		fs.readFile('data/gear.json', (err, data)=>{
			data = JSON.parse(data);
			resolve(data);
			if(err)reject(err);
		});
	});
}

/**
 * @desc Takes selection and filters out gear that doesn't match at least 1 ability in selection
 * @param selection array of abilities
 * @returns {Promise.<{shoes: [undefined], headgear: [undefined], clothing: [undefined]}>} - result set separated by type
 */
async function filterGears(selection){
	let gear = await readGear();
	
	let res = {
		"shoes" : [undefined],
		"headgear": [undefined],
		"clothing": [undefined]
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

/**
 * @desc  takes a kit and selected abilities and returns amt of selected abilities NOT in the kit
 * @param {int[]} kitVector - 1st element: selected headgear, 2nd : selected clothing, 3rd : selected shoes
 * @param {int[]} selectedAbilities - abilities specified by user
 * @param {obj} gears - contains all gears with at least 1 of the selected abilities
 */
function getRemaining(kitVector, selectedAbilities, gears){
	let remainingAbilities = selectedAbilities.slice();//creates copy
	
	selectedAbilities.forEach(abilityIndex=>{

		for(let i=0; i<3; i++) {
			if(kitVector[i] !== 0){
				let currentGear = gears[types[i]][kitVector[i]];
				let currentAbility = abilities[abilityIndex];
				let loc = remainingAbilities.indexOf(abilityIndex);
				let abilityAvailable = (loc) => loc > -1;
			
				
				if ( currentGear['main'] === currentAbility &&  abilityAvailable(loc)) {
					remainingAbilities.splice(loc, 1);
				}
				
				loc = remainingAbilities.indexOf(abilityIndex);
				
				if ( currentGear['likely_sub'] === currentAbility && abilityAvailable(loc)) {
					remainingAbilities.splice(loc, 1);
				}
			}
		}

	});
	
	return remainingAbilities;
}

function printAbilities(selectedAbilities){
	selectedAbilities.forEach(abilityIndex=>{
		console.log(abilities[abilityIndex])
	})
}

function printKit(kit, filteredGears){
	
	
	let any = {
		main: "Any",
		likely_sub:"Any",
		name: "Any",
		type: "-"
	};
	
	let nil = {
		main: "nil",
		likely_sub:"nil",
		name: "nil",
		type: "-"
	};
	
	let kitArr = [];
	
	for(let i=0; i<3; i++){
		let currentType = types[i];
		let currentGear = kit[i];
		
		if(filteredGears[currentType].length === 1)
			kitArr[i] = nil;
		else if(currentGear === 0){
			kitArr[i] = any;
			any.type = currentType;
		} else {
			kitArr[i] = filteredGears[currentType][currentGear]
		}
	}
	
	console.table(kitArr);
}

//returns 0 if not partial 1 if partial 2 if complete
function getCompletion(kit, k, selectedAbilities, gears){
	
	if(k === 0 )return 1;
	
	let remaining = getRemaining(kit, selectedAbilities, gears).length;
	
	if(k === 1 && remaining < 2)return 1;
	
	if(remaining === 0) return 2;
	
	return 0;
}

async function search(selectedAbilities){
	let gears = await filterGears(selectedAbilities);
	let N = [gears.headgear.length, gears.clothing.length, gears.shoes.length];
	let k = 0;
	let kits = [];
	let currentKit = [0, 0, 0];
	while(k >= 0){
		while(currentKit[k] < 3){
			currentKit[k]++;
			console.log(currentKit, k);
			// printKit(currentKit, gears);
			// let stage = getCompletion(currentKit, k, selectedAbilities, gears);
			// if(stage > 0){
			// 	if ( stage > 1){
			// 		kits.push(currentKit);
			// 	}
				k++;
				if(k > 3)break;
			// }
		}
		if(k < currentKit.length)currentKit[k] = 0;
		k--;
	}
	return kits;
}

let S =[3, 4, 5];
let kit = [1, 1, 1];

// console.log('Selected Abilities');
// printAbilities(S);
// //
// search(S).then(kits=>{
// 	console.log("done");
// });


filterGears(S).then(gears=>{
	printKit(kit, gears);
});

// filterGears(S).then(gears=>{
//
// 	printKit([1, 0, 0], gears);
// 	let rem = getRemaining(kit, S, gears);
// 	console.log('Abilities Remaining', rem.length);
// 	printAbilities(rem);
// 	let status = getCompletion(kit, 1, S, gears);
// 	console.log('Kit status ', status);
// });
//
//
