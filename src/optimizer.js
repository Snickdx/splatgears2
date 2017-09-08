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

function readGears(url){
	return new Promise( (resolve, reject) => {
		fs.readFile(url, (err, data)=>{
			data = JSON.parse(data);
			resolve(data);
			if(err)reject(err);
		});
	});
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
	console.log(kit[3]);
	console.table(kitArr);
}

/**
 * @desc Takes selection and filters out gear that doesn't match at least 1 ability in selection
 * @param selection array of abilities
 * @param gears array of gear objects
 * @returns {Promise.<{shoes: [object], headgear: [object], clothing: [object]}>} - result set separated by type
 */
function filterGears(selection, gears){

	let hash = {};
	
	let any = {
		main: "Any",
		likely_sub:"Any",
		name: "Any",
		type: "-"
	};
	
	let res = {
		"shoes" : [any],
		"headgear": [any],
		"clothing": [any]
	};
	
	gears.forEach(item=>{
		selection.forEach(index=>{
			if((item['main'] === abilities[index] || item['likely_sub'] === abilities[index]) && hash[item.id] !== true){
				res[item['type']].push(item);
				hash[item.id] = true;
			}
		})
	});
	return res;
}

/**
 * @desc  takes a kit and selected abilities and returns amt of selected abilities NOT in the kit
 * @param {int[]} kitVector - 1st element: selected headgear, 2nd : selected clothing, 3rd : selected shoes
 * @param {int[]} selectedAbilities - abilities specified by user
 * @param  gears - contains all gears with at least 1 of the selected abilities
 */
function getRemaining(kitVector, selectedAbilities, gears){
	let remainingAbilities = selectedAbilities.slice();//creates copy
	selectedAbilities.forEach(abilityIndex=>{
		for(let i=0; i<3; i++){
			if(kitVector[i] !== 0){
				let currentGear = gears[types[i]][kitVector[i]];
				let currentAbility = abilities[abilityIndex];
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

function getHash(arr, gears){
	return `${gears.headgear[arr[0]].id} ${gears.clothing[arr[1]].id} ${gears.shoes[arr[2]].id}`;
}

async function getKits(selection, filteredGears){
	
	let kits = {};
	let kit;
	let hash;
	let amtAbilities = selection.length;
	
	filteredGears.shoes.forEach((currentShoe, shoeIndex)=>{
		let rem = getRemaining([0, 0, shoeIndex], selection, filteredGears).length;
		if(rem === 0){
			kit = [0, 0, shoeIndex];
			hash = getHash(kit, filteredGears);
			kit.push(hash);
			kits[hash] = kit;
		}else{
			filteredGears.headgear.forEach((currentHeadgear, headgearIndex)=>{
				let rem = getRemaining([headgearIndex, 0, shoeIndex], selection, filteredGears).length;
				if(rem === 0){
					kit = [headgearIndex, 0, shoeIndex];
					hash = getHash(kit, filteredGears);
					kit.push(hash);
					kits[hash] = kit;
				}else if(rem < 3 && amtAbilities > 2) {
					filteredGears.clothing.forEach((currentClothing, clothingIndex) => {
						rem = getRemaining([headgearIndex, clothingIndex, shoeIndex], selection, filteredGears).length;
						if(rem === 0){
							kit = [headgearIndex, clothingIndex, shoeIndex];
							hash = getHash(kit, filteredGears);
							kit.push(hash);
							kits[hash] = kit;
						}
					})
				}
			})
		}
	});

	return kits;
}

async function main(){
	
	let S =[11, 12, 15];
	let gears = await filterGears(S, await readGears("data/gear.json"));
	
	let kits = await getKits(S, gears);
	
	let count = 0;
	for(let kit in kits){
		if(kits.hasOwnProperty(kit)){
			printKit(kits[kit], gears);
			count++;
		}
	}

	console.log(count, "Kits Returned");
	console.log("Abilities Selected");
	printAbilities(S);
	
}

main();