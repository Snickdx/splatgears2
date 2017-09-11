/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/ionic.app.css","cb3a998718982898e77c340930f01aaa"],["/css/main.css","e18ce9e38141d275e70a1f29fd806e87"],["/data/gear.json","d0a013bda85427a851f2ec83e53d4a32"],["/fonts/raleway/css/fonts.css","8b5057b049b6334828d340f08f9de40e"],["/fonts/raleway/fonts/Raleway-100/Raleway-100.ttf","19172697b6a56292329400af03186eda"],["/fonts/raleway/fonts/Raleway-100/Raleway-100.woff","af06b24211daae14856832e50438c69d"],["/fonts/raleway/fonts/Raleway-100italic/Raleway-100italic.ttf","a3e3fd28f7fbb501b0cb113ac5d51d22"],["/fonts/raleway/fonts/Raleway-100italic/Raleway-100italic.woff","cd96850eac91165c6ba9da40353d9e1f"],["/fonts/raleway/fonts/Raleway-200/Raleway-200.ttf","1755fb7d4cbce02555172bca710cb0d8"],["/fonts/raleway/fonts/Raleway-200/Raleway-200.woff","1d1ae2151a88c0f35b99433a005bc295"],["/fonts/raleway/fonts/Raleway-200italic/Raleway-200italic.ttf","54a450b86a251199cfb7ceca44eed1ff"],["/fonts/raleway/fonts/Raleway-200italic/Raleway-200italic.woff","170f27123bfe1991c7bf69882dbb5b1c"],["/fonts/raleway/fonts/Raleway-300/Raleway-300.ttf","041d98b686f76d723fe98439cedb2fef"],["/fonts/raleway/fonts/Raleway-300/Raleway-300.woff","9609023972d6e4d052c2bc58c8104470"],["/fonts/raleway/fonts/Raleway-300italic/Raleway-300italic.ttf","8e28922ebbca1a33cd5c98f358952ed6"],["/fonts/raleway/fonts/Raleway-300italic/Raleway-300italic.woff","8baafd6486a07cb91afa635bb63278fc"],["/fonts/raleway/fonts/Raleway-500/Raleway-500.ttf","974bf14323a6d201b432746a0b074bfb"],["/fonts/raleway/fonts/Raleway-500/Raleway-500.woff","61bdac9603ed743cc963d08d10d43035"],["/fonts/raleway/fonts/Raleway-500italic/Raleway-500italic.ttf","2f4fbef644b21b4a493ef14e43b856da"],["/fonts/raleway/fonts/Raleway-500italic/Raleway-500italic.woff","14c3ff5b290be0c91c3ac8bd7c939f97"],["/fonts/raleway/fonts/Raleway-600/Raleway-600.ttf","b429aaa604b2479ab9ab3a6b834f96d2"],["/fonts/raleway/fonts/Raleway-600/Raleway-600.woff","495cf0598c82ad1a1df7cd8c3a2fb277"],["/fonts/raleway/fonts/Raleway-600italic/Raleway-600italic.ttf","1d20b59314c1bf0ada11a90d11412dbe"],["/fonts/raleway/fonts/Raleway-600italic/Raleway-600italic.woff","b547d6883985fd6a29cb30ec289c3032"],["/fonts/raleway/fonts/Raleway-700/Raleway-700.ttf","b954e1fc424ea65dfe1dba0c24b5e0e4"],["/fonts/raleway/fonts/Raleway-700/Raleway-700.woff","f7645950eb8b995d0aa4887b65cc0197"],["/fonts/raleway/fonts/Raleway-700italic/Raleway-700italic.ttf","d994827834f53047e1156d53f45b25e3"],["/fonts/raleway/fonts/Raleway-700italic/Raleway-700italic.woff","634af4fcb715357922bcc68fa7516a9a"],["/fonts/raleway/fonts/Raleway-800/Raleway-800.ttf","7b991c0fd0092fcc0316a7c6c60d0aaf"],["/fonts/raleway/fonts/Raleway-800/Raleway-800.woff","7cd18714e1dd2a344929fcc175f0c06c"],["/fonts/raleway/fonts/Raleway-800italic/Raleway-800italic.ttf","565095f60b8212ea70e7d0076e8c1b0d"],["/fonts/raleway/fonts/Raleway-800italic/Raleway-800italic.woff","b565ea3e743b9cf10e43a0660fc35d60"],["/fonts/raleway/fonts/Raleway-900/Raleway-900.ttf","3eb86e793b971400c4a2966e12b9d024"],["/fonts/raleway/fonts/Raleway-900/Raleway-900.woff","fe871ff212c73f19a3fe7e9936cada31"],["/fonts/raleway/fonts/Raleway-900italic/Raleway-900italic.ttf","9c7573b1a019024bfa22c91da97d0924"],["/fonts/raleway/fonts/Raleway-900italic/Raleway-900italic.woff","839fd9f0d5b9b599acfa66403332a4e4"],["/fonts/raleway/fonts/Raleway-italic/Raleway-italic.ttf","3d47ee529a006578fd2be0819b9b08e4"],["/fonts/raleway/fonts/Raleway-italic/Raleway-italic.woff","9f292d6d9d6f45918e0073f7d460e464"],["/fonts/raleway/fonts/Raleway-regular/Raleway-regular.ttf","480bff6d5b503162dc823dab73ccfd18"],["/fonts/raleway/fonts/Raleway-regular/Raleway-regular.woff","65a0f1e7bab6cc723734bc83ee37b456"],["/img/TrgFHe9TkevBJe0MMRV0_abilities.png","af31335f99f08952d8db490a8fe34b90"],["/img/abilities/Ability Doubler.png","390c7e3f7ab001f3b146a61eee8931d8"],["/img/abilities/Any.png","bcdc86cec6ba7173796d1ed8fd875a9c"],["/img/abilities/Bomb Defense Up.png","50f84a29c0c3f83f4a8a0c66b30ddf0e"],["/img/abilities/Cold-Blooded.png","c2f0db68d678f7870b38a16d867f99f2"],["/img/abilities/Comeback.png","ccd1b98a5e400964ef224627ed203933"],["/img/abilities/Drop Roller.png","ef56f4f285b9679e3a5e35e65d0e7e35"],["/img/abilities/Haunt.png","5416e5b6cb98124d08530b8ac0130e6d"],["/img/abilities/Ink Recovery Up.png","36cf0a973c5ff349516bf235fbc6106f"],["/img/abilities/Ink Resistance Up.png","84ed06c212fd765565d9d6e02b78711e"],["/img/abilities/Ink Saver (Main).png","831d0c899a53d73eb8fe2c79d393eacc"],["/img/abilities/Ink Saver (Sub).png","ca721ba1f6216b0930d5014b9454d6e1"],["/img/abilities/Last-Ditch Effort.png","37e10271de3e8a16164a54dafcb4f51d"],["/img/abilities/Ninja Squid.png","029e175b4a9e6d9ff79f29109df518ea"],["/img/abilities/Object Shredder.png","ec6c13531d66d44c9561f14175d4f876"],["/img/abilities/Opening Gambit.png","db5a770f77bd0d34756faa4702489cf2"],["/img/abilities/Quick Respawn.png","f1bfb4d3a64d983ede43b42553580573"],["/img/abilities/Quick Super Jump.png","78b6706a436c339a7ba909a16fe04a82"],["/img/abilities/Respawn Punisher.png","7baca742877db54be318319ec65b1ee1"],["/img/abilities/Run Speed Up.png","0b6f90dc3c140a62b48066f445ce669f"],["/img/abilities/Special Charge Up.png","65f1f30e09f0186ef3736cc8dea11bc3"],["/img/abilities/Special Power Up.png","058d46e2bc525f2fedbc7130833bb90b"],["/img/abilities/Special Saver.png","aecdbd785f28aa9d15a3c76793dcc50f"],["/img/abilities/Stealth Jump.png","7a123fc5f15c4fd078215b43d294a94f"],["/img/abilities/Sub Power Up.png","be940d834a8d517dcd2d4ce553a81b3a"],["/img/abilities/Swim Speed Up.png","2d47cee003857c535cd5f877ba77697c"],["/img/abilities/Tenacity.png","489367ed8b0cde9868075ef486c4fc33"],["/img/abilities/Thermal Ink.png","e6093bd3decf090efc4d5cb4fe4c5c26"],["/img/android-icon-144x144.png","af41e9d4ca24e2c42e7cc6072dbd115a"],["/img/android-icon-192x192.png","45719bf5a1d5e8b6040502aba99d3e7f"],["/img/android-icon-36x36.png","b380b78515a859ca4d3fd7559cb14a7f"],["/img/android-icon-48x48.png","d3b189e0a8beeb0b78364966fef88290"],["/img/android-icon-72x72.png","67c14cbfeb6e35ad6c39b962a9ba454b"],["/img/android-icon-96x96.png","690c2ffd32159b96c3cc09db1804a2fe"],["/img/apple-icon-120x120.png","f49be669a795e913edd7bff3a6357a18"],["/img/gear/60px-S2_Gear_Clothing_Anchor_Sweat.png","614db5a869c320e1165505a62b441281"],["/img/gear/60px-S2_Gear_Clothing_Annaki_Drive_Tee.png","367b1e8edfeaf0b584197c42a39953ea"],["/img/gear/60px-S2_Gear_Clothing_Annaki_Evolution_Tee.png","91f6e55f0df3e8231835d5c225e76cbf"],["/img/gear/60px-S2_Gear_Clothing_Armor_Jacket_Replica.png","d900172369a547d6cdcbeaf6c1625b9b"],["/img/gear/60px-S2_Gear_Clothing_B-ball_Jersey_(Away).png","7c130c9621c8d221f4d0fbd8d9533c90"],["/img/gear/60px-S2_Gear_Clothing_Baby-Jelly_Shirt.png","93c265e405a0646ca4c776d9df68f73e"],["/img/gear/60px-S2_Gear_Clothing_Baby-Jelly_Shirt_&_Tie.png","fb5ee8403b9a62232459773343ed424b"],["/img/gear/60px-S2_Gear_Clothing_Basic_Tee.png","aecfb347017af7bce8f7ddd90714ee8b"],["/img/gear/60px-S2_Gear_Clothing_Berry_Ski_Jacket.png","878d3d84b079cfc9a7006752e6533299"],["/img/gear/60px-S2_Gear_Clothing_Birded_Corduroy_Jacket.png","0a6b2eda2539b60354766ed9a5db01b2"],["/img/gear/60px-S2_Gear_Clothing_Black_Inky_Rider.png","b8d51146ba5d4e94153e00724fc7446e"],["/img/gear/60px-S2_Gear_Clothing_Black_LS.png","946eea0a96dcc1f5dcbe95d09f01005b"],["/img/gear/60px-S2_Gear_Clothing_Black_Squideye.png","ae3a11e1dff1d45d490b2a53a43e6a7c"],["/img/gear/60px-S2_Gear_Clothing_Black_Tee.png","9e37f6cdca282e5a9c28503e6266291e"],["/img/gear/60px-S2_Gear_Clothing_Black_Urchin_Rock_Tee.png","97f92d08f3c977d4c702cb39ad1cabb7"],["/img/gear/60px-S2_Gear_Clothing_Black_V-Neck_Tee.png","34fda911a9afee534dddd1af4da3fd70"],["/img/gear/60px-S2_Gear_Clothing_Blue_Peaks_Tee.png","0968987ba12490859b09aae336987c9a"],["/img/gear/60px-S2_Gear_Clothing_Blue_Sailor_Suit.png","9b83d6df44f8bde9eb2275b50d243ad0"],["/img/gear/60px-S2_Gear_Clothing_Blue_Tentatek_Tee.png","bf9407e1ee1e889457836d82805a6a01"],["/img/gear/60px-S2_Gear_Clothing_Brown_FA-11_Bomber.png","7bc0a1a83f86a13e2485cea915073346"],["/img/gear/60px-S2_Gear_Clothing_Camo_Zip_Hoodie.png","4c778176e56c3df95f93d8f7d2b7c8d0"],["/img/gear/60px-S2_Gear_Clothing_Chilly_Mountain_Coat.png","07be82b0442017724b71589840512267"],["/img/gear/60px-S2_Gear_Clothing_Chirpy_Chips_Band_Tee.png","021459312f4f2a5868e60127188fee40"],["/img/gear/60px-S2_Gear_Clothing_Choco_Layered_LS.png","860b5ec8719d7eaf437c2a1a2f6d0c17"],["/img/gear/60px-S2_Gear_Clothing_Crimson_Parashooter.png","33d0c9e6f1715d59b0b1dcf345c5c7bf"],["/img/gear/60px-S2_Gear_Clothing_Cycle_King_Jersey.png","60a2bb26e2b5cbb25003982af3917c96"],["/img/gear/60px-S2_Gear_Clothing_Dark_Urban_Vest.png","0ca1bdeb20ca6b52f241438b5ceb509f"],["/img/gear/60px-S2_Gear_Clothing_Eggplant_Mountain_Coat.png","ecad9435e57bc909473eb5ca685f6e03"],["/img/gear/60px-S2_Gear_Clothing_FA-01_Jacket.png","cd42153285a5a7cf89f9db38513503da"],["/img/gear/60px-S2_Gear_Clothing_FA-01_Reversed.png","275fb33cc75d17972b282fb1d8df3150"],["/img/gear/60px-S2_Gear_Clothing_FC_Albacore.png","cc9f97ee403953c3b25bc6cdfd4892e9"],["/img/gear/60px-S2_Gear_Clothing_Fugu_Tee.png","cb6e162731c0a3b7ed1a864596995b78"],["/img/gear/60px-S2_Gear_Clothing_Grape_Hoodie.png","8719b4b5c5b5dd9f75996d22be5ecae1"],["/img/gear/60px-S2_Gear_Clothing_Gray_8-Bit_FishFry.png","c52775ed72f513b9fa7714e143dbf773"],["/img/gear/60px-S2_Gear_Clothing_Gray_FA-11_Bomber.png","63c7df5a847e2b528cc6a32629eadeb2"],["/img/gear/60px-S2_Gear_Clothing_Gray_Hoodie.png","49cc06edd7aab6a5823ac47e956d190d"],["/img/gear/60px-S2_Gear_Clothing_Green-Check_Shirt.png","64985d7f30f78a05f92b5aa8f96b3e61"],["/img/gear/60px-S2_Gear_Clothing_Green_Tee.png","f02dc7a20a2fbebf8d66e62b51cdf78a"],["/img/gear/60px-S2_Gear_Clothing_Green_V-Neck_Limited_Tee.png","1066ccf39d24eb5747c6532bdc15f484"],["/img/gear/60px-S2_Gear_Clothing_Half-Sleeve_Sweater.png","dacdd8ce46de4069b5f55832a6addc88"],["/img/gear/60px-S2_Gear_Clothing_Hero_Hoodie_Replica.png","b675d460e09c8efbb9caa766f37448f2"],["/img/gear/60px-S2_Gear_Clothing_Hero_Jacket_Replica.png","f43b7b89eca94ea89ac6325d26a7e005"],["/img/gear/60px-S2_Gear_Clothing_Hightide_Era_Band_Tee.png","8d9f9bd2a6eafb7355d3c7beaa6a2ebe"],["/img/gear/60px-S2_Gear_Clothing_Hula_Punk_Shirt.png","94d2b9acf96c93a035d45bcdc5f224d4"],["/img/gear/60px-S2_Gear_Clothing_Inkfall_Shirt.png","85521aa0ba814db8bf5e2263abc199b8"],["/img/gear/60px-S2_Gear_Clothing_Inkopolis_Squaps_Jersey.png","a69d86a73b1645d4fb62f9de9250aed3"],["/img/gear/60px-S2_Gear_Clothing_King_Jersey.png","6746ccd84aecf593f65ac20d94dc47d7"],["/img/gear/60px-S2_Gear_Clothing_Layered_Anchor_LS.png","162b9a6734d2642c3bef1178cf03c8e4"],["/img/gear/60px-S2_Gear_Clothing_Layered_Vector_LS.png","165df1d205e848666947ce4a885a54ae"],["/img/gear/60px-S2_Gear_Clothing_Lime_Easy-Stripe_Shirt.png","c9fce2055bdd1cef3a7fd02662f09692"],["/img/gear/60px-S2_Gear_Clothing_Logo_Aloha_Shirt.png","3c209c6a6c1866ba5662d6ef97427a58"],["/img/gear/60px-S2_Gear_Clothing_Matcha_Down_Jacket.png","c9999d8692aad6bb198af485294846ec"],["/img/gear/60px-S2_Gear_Clothing_Mint_Tee.png","08936bd4c91cf8d08fdb57817f41a5c7"],["/img/gear/60px-S2_Gear_Clothing_Mister_Shrug_Tee.png","b56c59898c0c162dfcf5467ae1acb722"],["/img/gear/60px-S2_Gear_Clothing_Navy_Deca_Logo_Tee.png","78dee1e99b4156f4ce875b675457218a"],["/img/gear/60px-S2_Gear_Clothing_Navy_King_Tank.png","8486db34036a4fc17d7b2de9e9970237"],["/img/gear/60px-S2_Gear_Clothing_Navy_Striped_LS.png","3ceceabbff99643a8cddafe50e085c4a"],["/img/gear/60px-S2_Gear_Clothing_Negative_Longcuff_Sweater.png","85c4d925769e06d009fe106a1601de0e"],["/img/gear/60px-S2_Gear_Clothing_Octobowler_Shirt.png","3f241d595188bcb3e3d2d7d1f66a029b"],["/img/gear/60px-S2_Gear_Clothing_Pink_Easy-Stripe_Shirt.png","00a6364ea973faa22bfb627ee5cbda2b"],["/img/gear/60px-S2_Gear_Clothing_Positive_Longcuff_Sweater.png","f9328c3e74e87cc765c07eb0b9ba59a7"],["/img/gear/60px-S2_Gear_Clothing_Power_Armor.png","b4db7ec617a598cc671c7478fd69822c"],["/img/gear/60px-S2_Gear_Clothing_Power_Armor_Mk_I.png","191e244fe1ffe6e143a094083c7dc8fd"],["/img/gear/60px-S2_Gear_Clothing_Prune_Parashooter.png","61e67cbebd0dc0c998c9fde25323e5e7"],["/img/gear/60px-S2_Gear_Clothing_Pullover_Coat.png","ada8b9508a59a1f13d9fb228ced9d586"],["/img/gear/60px-S2_Gear_Clothing_Purple_Camo_LS.png","f95b634ab445b647cccb000f307a061e"],["/img/gear/60px-S2_Gear_Clothing_Red_Tentatek_Tee.png","b0bbdfe465c6fd7dbad61544a1c50bd5"],["/img/gear/60px-S2_Gear_Clothing_Red_V-Neck_Limited_Tee.png","1d53a458c3fcf7410f76137c0bba84a0"],["/img/gear/60px-S2_Gear_Clothing_Red_Vector_Tee.png","5a74d8c2a44ac37c428f0c1fa2801bca"],["/img/gear/60px-S2_Gear_Clothing_Reel_Sweat.png","f338117fd97cdc1a018db3181a99ce95"],["/img/gear/60px-S2_Gear_Clothing_Retro_Sweat.png","8cd009525c7d41d72ead9e041af87c69"],["/img/gear/60px-S2_Gear_Clothing_Sailor-Stripe_Tee.png","a537bf3f13d10ed06dce09a5949086b5"],["/img/gear/60px-S2_Gear_Clothing_Samurai_Jacket.png","01e7bba7dd838707c0774989dc685730"],["/img/gear/60px-S2_Gear_Clothing_School_Cardigan.png","30126765931bd0abf3e86d4ea9fe76bd"],["/img/gear/60px-S2_Gear_Clothing_School_Uniform.png","12ee8af9d3236ef28a5694f1a0f12966"],["/img/gear/60px-S2_Gear_Clothing_Shirt_&_Tie.png","952ed01adc429adc564a8aaf4f2619a3"],["/img/gear/60px-S2_Gear_Clothing_Shirt_with_Blue_Hoodie.png","025822168cc939786329cef172e757f4"],["/img/gear/60px-S2_Gear_Clothing_Short_Knit_Layers.png","67e696c1363d700f84cb1d188d2e17e7"],["/img/gear/60px-S2_Gear_Clothing_Shrimp-Pink_Polo.png","1d856c2418e1084b487f7e3726fdaacd"],["/img/gear/60px-S2_Gear_Clothing_Slash_King_Tank.png","1210d6d8641f935d4a1eeb28fb99cdce"],["/img/gear/60px-S2_Gear_Clothing_Slipstream_United.png","92ddd6f26f5f9ee5c15ceb5b9a016ddc"],["/img/gear/60px-S2_Gear_Clothing_Splatfest_Tee.png","495b820650ea20850c7135cff990be9e"],["/img/gear/60px-S2_Gear_Clothing_Squid_Satin_Jacket.png","068f1a67016577fc4def69bbcbe3f199"],["/img/gear/60px-S2_Gear_Clothing_Squid_Squad_Band_Tee.png","7627eb3f8d7e981a962ca545c7e319bb"],["/img/gear/60px-S2_Gear_Clothing_Squiddor_Polo.png","e8703c0b40c8063d5014cccebed1f213"],["/img/gear/60px-S2_Gear_Clothing_Squinja_Suit.png","d62379e263049f1f0a575cfb09f7cbd2"],["/img/gear/60px-S2_Gear_Clothing_Sunny-Day_Tee.png","f2d54680acb5e938a9c54434f600706c"],["/img/gear/60px-S2_Gear_Clothing_Takoroka_Windcrusher.png","3d75b533b5c9459993f0b452ab169fa2"],["/img/gear/60px-S2_Gear_Clothing_Urchins_Jersey.png","5f4b3c18bff9f541e9cb1bf23474ef4f"],["/img/gear/60px-S2_Gear_Clothing_Varsity_Jacket.png","292d31a678f7042d3efea3d610da3406"],["/img/gear/60px-S2_Gear_Clothing_Vintage_Check_Shirt.png","e6049af17c67a2e3b36951d883ede2de"],["/img/gear/60px-S2_Gear_Clothing_Wet_Floor_Band_Tee.png","99763ad23268f46cb8a445e036581979"],["/img/gear/60px-S2_Gear_Clothing_White_8-Bit_FishFry.png","7739c021580a54705ba1e0248c6f42be"],["/img/gear/60px-S2_Gear_Clothing_White_Anchor_Tee.png","73ac38722abf934b9495ac7cc1332536"],["/img/gear/60px-S2_Gear_Clothing_White_Baseball_LS.png","7e6f18b3e3c9964e6517d4e47270003d"],["/img/gear/60px-S2_Gear_Clothing_White_Deca_Logo_Tee.png","6c3702e5ab5ac6d2a67fbd9b66f919d5"],["/img/gear/60px-S2_Gear_Clothing_White_Inky_Rider.png","cc1c4915749e827b6094be496e3804e2"],["/img/gear/60px-S2_Gear_Clothing_White_King_Tank.png","94352aab1616759f1480b6896e819501"],["/img/gear/60px-S2_Gear_Clothing_White_Tee.png","c9a88b6c330cd26bac6965a31e1c91c8"],["/img/gear/60px-S2_Gear_Clothing_White_Urchin_Rock_Tee.png","45aa5febd6430c2b8ac26c6073a5c95e"],["/img/gear/60px-S2_Gear_Clothing_White_V-Neck_Tee.png","ce9eec80b24ba0a2b1beec9441dd50a0"],["/img/gear/60px-S2_Gear_Clothing_Yellow_Layered_LS.png","b6246d9379b2033c8bb77d21fc325017"],["/img/gear/60px-S2_Gear_Clothing_Yellow_Urban_Vest.png","a3d2c5d5a3ffa74aa2c140f9c5d6cd30"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Baseball_LS.png","e57ee5ede721aadfa5d4ad4422de8d83"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Hoodie.png","747c1c8072fa32d7a31e27106f4a1b23"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Jade_Coat.png","8c424ef6e1f01ca6e7cae63ee5019b19"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Redleaf_Coat.png","a35a024a6103bad949be3b94ca3331e8"],["/img/gear/60px-S2_Gear_Clothing_Zink_Layered_LS.png","04e36c23b7be6afd565f6ee11c4902f0"],["/img/gear/60px-S2_Gear_Headgear_18K_Aviators.png","10631a414804e1897ae8bb227252490b"],["/img/gear/60px-S2_Gear_Headgear_Annaki_Beret.png","3e7d3190e7dac7943249cad96ef2defb"],["/img/gear/60px-S2_Gear_Headgear_Annaki_Mask.png","87c9d8b187be85edb891ab2819c97821"],["/img/gear/60px-S2_Gear_Headgear_Armor_Helmet_Replica.png","51e50d8d7ca5946ec739136d559cfb0f"],["/img/gear/60px-S2_Gear_Headgear_Backwards_Cap.png","9794639fb803f3c3aac0442dd3e1a646"],["/img/gear/60px-S2_Gear_Headgear_Bamboo_Hat.png","3b4b5d32d3a8d0cc65fe6542953fcf74"],["/img/gear/60px-S2_Gear_Headgear_Bike_Helmet.png","e773be7a1d9c583beb19cf7e55e1d9b7"],["/img/gear/60px-S2_Gear_Headgear_Blowfish_Bell_Hat.png","6e4f595b567cf0cd585e42b8e6bf76b6"],["/img/gear/60px-S2_Gear_Headgear_Bobble_Hat.png","28973592d9c03a22421558fa503470f7"],["/img/gear/60px-S2_Gear_Headgear_Bucket_Hat.png","f82ff961fa221b6ef77178b52ea36325"],["/img/gear/60px-S2_Gear_Headgear_Camo_Mesh.png","5390c0004b5284ad20a9de311df4fc97"],["/img/gear/60px-S2_Gear_Headgear_Camping_Hat.png","3f86a88c60f2b58dba5127e42fb89e8d"],["/img/gear/60px-S2_Gear_Headgear_Cycle_King_Cap.png","2b45f47be0a15a691a06d8f46ee41b60"],["/img/gear/60px-S2_Gear_Headgear_Fake_Contacts.png","907cb14b10b6718f1edb6feec8ed083a"],["/img/gear/60px-S2_Gear_Headgear_Firefin_Facemask.png","42ec28e7e567b40b350b400e26344fb5"],["/img/gear/60px-S2_Gear_Headgear_FishFry_Visor.png","9af62a6566ec4e441355ccfb416fe83b"],["/img/gear/60px-S2_Gear_Headgear_Five-Panel_Cap.png","5fbd89d764408d727c9b247e44d67a99"],["/img/gear/60px-S2_Gear_Headgear_Half-Rim_Glasses.png","d13319b588b7e5c8aa6b6d62a9ae455c"],["/img/gear/60px-S2_Gear_Headgear_Headlamp_Helmet.png","c0284fad8f173d5512478637d36f617c"],["/img/gear/60px-S2_Gear_Headgear_Hero_Headphones_Replica.png","431e8e71adf19e80e38c20e3b2e66495"],["/img/gear/60px-S2_Gear_Headgear_Hero_Headset_Replica.png","59ed413b6dedeaf2b0e260d5f4e338ad"],["/img/gear/60px-S2_Gear_Headgear_Hickory_Work_Cap.png","87a48eadde6420da113db89372b39fc6"],["/img/gear/60px-S2_Gear_Headgear_Hockey_Helmet.png","3eb936702f9e479dace22d1252938833"],["/img/gear/60px-S2_Gear_Headgear_Jellyvader_Cap.png","5328be1fc1daeb025fe430abea8dc7f8"],["/img/gear/60px-S2_Gear_Headgear_King_Facemask.png","d0aa42f915bd65080a0fe674814cb714"],["/img/gear/60px-S2_Gear_Headgear_King_Flip_Mesh.png","4766b60c83a27e4ae9452f97e736b488"],["/img/gear/60px-S2_Gear_Headgear_Knitted_Hat.png","2bfde10cea5acbe0d80e1bcefedda681"],["/img/gear/60px-S2_Gear_Headgear_Lightweight_Cap.png","5518cb7a66042ccde5bbda4bd4ca8b17"],["/img/gear/60px-S2_Gear_Headgear_MTB_Helmet.png","c34b0f7ac662d6d35840bfcbc16e8ef9"],["/img/gear/60px-S2_Gear_Headgear_Noise_Cancelers.png","cd9e8cebccf522310e28b6ec6c78aaf5"],["/img/gear/60px-S2_Gear_Headgear_Paintball_Mask.png","b5ad471b63eb043c633d8a6a2a22abaa"],["/img/gear/60px-S2_Gear_Headgear_Painter's_Mask.png","3550dd455e783652a0b4d3c7f2803975"],["/img/gear/60px-S2_Gear_Headgear_Patched_Hat.png","e7ad3098f7ae05fbeab8161d596e04a5"],["/img/gear/60px-S2_Gear_Headgear_Pilot_Goggles.png","c0c13e8d4f1095d5c7ae41bacda9f29a"],["/img/gear/60px-S2_Gear_Headgear_Power_Mask.png","66288019dec08be3bf3ad07b4496a94e"],["/img/gear/60px-S2_Gear_Headgear_Power_Mask_Mk_I.png","c9f7d93de80411a8984512ea1914aef8"],["/img/gear/60px-S2_Gear_Headgear_Retro_Specs.png","29e7cbdd3a1ffa6cf1669775385cdc0e"],["/img/gear/60px-S2_Gear_Headgear_Safari_Hat.png","aea838ee638367833819f62a11f964e2"],["/img/gear/60px-S2_Gear_Headgear_Samurai_Helmet.png","81ae9d6a84521faa8a8ab4e2f8ad2276"],["/img/gear/60px-S2_Gear_Headgear_Skull_Bandana.png","96f4019034ade78d2519eb1b59d0f9e1"],["/img/gear/60px-S2_Gear_Headgear_Snorkel_Mask.png","a7eed8728cdf8a6f4ced0403322c67ec"],["/img/gear/60px-S2_Gear_Headgear_Soccer_Headband.png","d1ba71553bdd81a8bb3b2eda5ebe2c7f"],["/img/gear/60px-S2_Gear_Headgear_Special_Forces_Beret.png","39197489d22b9c9afacf2dca2508f119"],["/img/gear/60px-S2_Gear_Headgear_Squash_Headband.png","dde1504e9d958c331902a61af2617289"],["/img/gear/60px-S2_Gear_Headgear_Squid_Clip-Ons.png","f757edbf11cf752ef4add59ed3deb066"],["/img/gear/60px-S2_Gear_Headgear_Squid_Facemask.png","b9b1cb7a102ff51c4544431a282efb80"],["/img/gear/60px-S2_Gear_Headgear_Squid_Hairclip.png","56011a01c46e6c5886b1b341fd9326c2"],["/img/gear/60px-S2_Gear_Headgear_Squidfin_Hook_Cans.png","7777644cc6317668ac225ae01198931f"],["/img/gear/60px-S2_Gear_Headgear_Squidvader_Cap.png","056dd2341c54bd136ec67128f2b4a0ab"],["/img/gear/60px-S2_Gear_Headgear_Squinja_Mask.png","02d7d6fced93d65a0bc4576f6f0a02e5"],["/img/gear/60px-S2_Gear_Headgear_Straw_Boater.png","cee3eef0e2858935ee080d960afeb766"],["/img/gear/60px-S2_Gear_Headgear_Striped_Beanie.png","65edcde272214039b9e7e6154bb147d8"],["/img/gear/60px-S2_Gear_Headgear_Studio_Headphones.png","a9aebb5e157eaff8cd9ba0cb011419e5"],["/img/gear/60px-S2_Gear_Headgear_Sun_Visor.png","314727bf1fcaa90eb3e7fd268b8faffd"],["/img/gear/60px-S2_Gear_Headgear_Takoroka_Mesh.png","869e3dbe48abef9442c5f3f12949d4e1"],["/img/gear/60px-S2_Gear_Headgear_Takoroka_Visor.png","e729c69d1209cdf3d3ff427d199c6e07"],["/img/gear/60px-S2_Gear_Headgear_Tennis_Headband.png","b0cf08f82462baeb93c8ef1d69c8ed7d"],["/img/gear/60px-S2_Gear_Headgear_Tinted_Shades.png","fdda5408e110c18bb9123a99a198381d"],["/img/gear/60px-S2_Gear_Headgear_Urchins_Cap.png","074dee37b88dd368866cb7b9bda8fde3"],["/img/gear/60px-S2_Gear_Headgear_Visor_Skate_Helmet.png","3a256f2799ba1dd02e856eeca514ac40"],["/img/gear/60px-S2_Gear_Headgear_White_Headband.png","425bea3d5ebb03c71fa1540c43beb923"],["/img/gear/60px-S2_Gear_Shoes_Acerola_Rain_Boots.png","9c28f75d3f5707e614f28040431e1a4d"],["/img/gear/60px-S2_Gear_Shoes_Armor_Boot_Replicas.png","def59cefc5b57bf964afe64cd9f37b47"],["/img/gear/60px-S2_Gear_Shoes_Arrow_Pull-Ons.png","835b9ed83d6ef6d6badd0cddb97f621b"],["/img/gear/60px-S2_Gear_Shoes_Birch_Climbing_Shoes.png","2744d8feb906c02ca612818ae5e1bf48"],["/img/gear/60px-S2_Gear_Shoes_Black_Dakroniks.png","3a796ddad62c7397f3de3e33da1611d6"],["/img/gear/60px-S2_Gear_Shoes_Black_Flip-Flops.png","d2720419f1e568d5d7754eef11540246"],["/img/gear/60px-S2_Gear_Shoes_Black_Norimaki_750s.png","5b3531bf8254c810b36f42ffcf73a683"],["/img/gear/60px-S2_Gear_Shoes_Black_Trainers.png","4e84158c0d2b8c3f4efc503e75be38de"],["/img/gear/60px-S2_Gear_Shoes_Blue_&_Black_Squidkid_IV.png","f879b03ea5334f727d088a36f31d5985"],["/img/gear/60px-S2_Gear_Shoes_Blue_Moto_Boots.png","4363a941e1c476aef34191d348803aab"],["/img/gear/60px-S2_Gear_Shoes_Blue_Slip-Ons.png","e61dc35b6d5d4320728951ab7754159b"],["/img/gear/60px-S2_Gear_Shoes_Blueberry_Casuals.png","968aaf2a146b6a7e49f0e015e45c29aa"],["/img/gear/60px-S2_Gear_Shoes_Canary_Trainers.png","e8442f03bb538bfe5b89c466078226e5"],["/img/gear/60px-S2_Gear_Shoes_Cherry_Kicks.png","6991a46ddbd37c31da6778f0b8f47d2e"],["/img/gear/60px-S2_Gear_Shoes_Choco_Clogs.png","b7f325643dde96b2b6ffb77fbcf5443a"],["/img/gear/60px-S2_Gear_Shoes_Crazy_Arrows.png","60ada3f3485aa1bf856164ea43d80ec3"],["/img/gear/60px-S2_Gear_Shoes_Cream_Basics.png","06010d90a8154ba94fc7a17a9d2ac271"],["/img/gear/60px-S2_Gear_Shoes_Fringed_Loafers.png","732b9504168c8a839dfc4f5b919839bf"],["/img/gear/60px-S2_Gear_Shoes_Gold_Hi-Horses.png","68cec4ed5a9d447a0e8fdf11ae9b3345"],["/img/gear/60px-S2_Gear_Shoes_Gray_Sea-Slug_Hi-Tops.png","f8761fd5ddc40003cb4d5b643efc216c"],["/img/gear/60px-S2_Gear_Shoes_Hero_Runner_Replicas.png","7f906d6121ff95ecedb3e7383cace85b"],["/img/gear/60px-S2_Gear_Shoes_Hero_Snowboots_Replicas.png","575907ace9fa063a64e8d55c4699bbc5"],["/img/gear/60px-S2_Gear_Shoes_Hunter_Hi-Tops.png","3c72c269885209f600b2bf61f632472d"],["/img/gear/60px-S2_Gear_Shoes_Hunting_Boots.png","24efeaea5f23be875bf67480df9890c6"],["/img/gear/60px-S2_Gear_Shoes_Kid_Clams.png","32094a84ec16645bea425b8dd902d461"],["/img/gear/60px-S2_Gear_Shoes_LE_Soccer_Shoes.png","388a9df965c5c30afaf43e27ace66dfd"],["/img/gear/60px-S2_Gear_Shoes_Mawcasins.png","ece0fc7003f09628f28daa243b4bc8a4"],["/img/gear/60px-S2_Gear_Shoes_Mint_Dakroniks.png","67393dd7ce2c849aede67bd0bf357383"],["/img/gear/60px-S2_Gear_Shoes_Moto_Boots.png","efffc05790fc3fa381c2a651846b7d79"],["/img/gear/60px-S2_Gear_Shoes_Neon_Delta_Straps.png","f3c7e60d1f66f9ebabc25e3ff8eca624"],["/img/gear/60px-S2_Gear_Shoes_Neon_Sea_Slugs.png","ac3cfa8d4bca66014cb31031fa59d221"],["/img/gear/60px-S2_Gear_Shoes_Orange_Arrows.png","02de4c06ce373177e3b98b9c984613a9"],["/img/gear/60px-S2_Gear_Shoes_Orca_Hi-Tops.png","eecdbd7c343827dfb6bd3765659ad631"],["/img/gear/60px-S2_Gear_Shoes_Oyster_Clogs.png","8d07954f5cd0934bfc28d76da6987433"],["/img/gear/60px-S2_Gear_Shoes_Pink_Trainers.png","160f68326c6beca18c4d4f0b70f2158d"],["/img/gear/60px-S2_Gear_Shoes_Piranha_Moccasins.png","114cf422649c54c045ba85c60883b4c2"],["/img/gear/60px-S2_Gear_Shoes_Plum_Casuals.png","c938a14e8ea4f7a783fe8cc5a5b19b0a"],["/img/gear/60px-S2_Gear_Shoes_Power_Boots.png","5010f21991e2ba9f34cf789417a2b0bc"],["/img/gear/60px-S2_Gear_Shoes_Power_Boots_Mk_I.png","d52f30909d2b9933d136b659f2369fb3"],["/img/gear/60px-S2_Gear_Shoes_Pro_Trail_Boots.png","193f872aaf9fecd1d22808917faffd46"],["/img/gear/60px-S2_Gear_Shoes_Punk_Blacks.png","650a802bbf0250c4c223bb9fd38bf27f"],["/img/gear/60px-S2_Gear_Shoes_Punk_Whites.png","965f0b4063c94c812b16c93a71a5648f"],["/img/gear/60px-S2_Gear_Shoes_Purple_Hi-Horses.png","a26bc6b76c87210ed1a61fa7dc460657"],["/img/gear/60px-S2_Gear_Shoes_Purple_Sea_Slugs.png","f4431847e26576d3d5c1e4ac15ee9f97"],["/img/gear/60px-S2_Gear_Shoes_Red-Mesh_Sneakers.png","9321dec4613039144aeb82f7ae321762"],["/img/gear/60px-S2_Gear_Shoes_Red_&_Black_Squidkid_IV.png","326a2aee7698a089e9613c94e2d80357"],["/img/gear/60px-S2_Gear_Shoes_Red_Hi-Horses.png","c8a4734952f15f6f068132d9ccabe379"],["/img/gear/60px-S2_Gear_Shoes_Roasted_Brogues.png","d2a05393f8cbd014405e0cf83fd6b5a1"],["/img/gear/60px-S2_Gear_Shoes_Samurai_Shoes.png","f5d2e68b33cd3c990d139217c146417a"],["/img/gear/60px-S2_Gear_Shoes_School_Shoes.png","680c918f22be7bcd62c605bab13423a2"],["/img/gear/60px-S2_Gear_Shoes_Smoky_Wingtips.png","bf72951eeb37f89222e2936ce5a74ad4"],["/img/gear/60px-S2_Gear_Shoes_Snow_Delta_Straps.png","9c87e062ad6ac6f0682df317bdc9655b"],["/img/gear/60px-S2_Gear_Shoes_Squinja_Boots.png","81d7961e44eddbcba124d49f93928781"],["/img/gear/60px-S2_Gear_Shoes_Strapping_Reds.png","4786351864ded5f13b40d1ff3e59397e"],["/img/gear/60px-S2_Gear_Shoes_Strapping_Whites.png","570bc160ec5700c1423fd912cad2f5f3"],["/img/gear/60px-S2_Gear_Shoes_Sunny_Climbing_Shoes.png","710b404ad272eca3404f3fd8ae039be6"],["/img/gear/60px-S2_Gear_Shoes_Sunset_Orca_Hi-Tops.png","d2e4f63d3f5b4c3ec49a08a68d83fdd7"],["/img/gear/60px-S2_Gear_Shoes_Trail_Boots.png","75d0ce69069620a77a954bba63d89d06"],["/img/gear/60px-S2_Gear_Shoes_White_Kicks.png","5982b12687ba907b5750463c2786d02e"],["/img/gear/60px-S2_Gear_Shoes_White_Norimaki_750s.png","4c565e17d5596d9583ca1cf9adbea0d3"],["/img/gear/60px-S2_Gear_Shoes_White_Seahorses.png","ca06f9485b1a83be8abf8df1ca1620d3"],["/img/gear/60px-S2_Gear_Shoes_Yellow-Mesh_Sneakers.png","23bb1301649d72b77bc660fadfe0c873"],["/img/gear/Any.png","fb3353c6c66d448479b89d7dc100a945"],["/index.html","f64fc6b80b674eaa56d641632f01b57e"],["/lib/angular/angular-csp.css","de6110463ed5001dd95aa3bbbc7c129c"],["/lib/angular/bower.json","34c734ce40065a6f97211711915775cd"],["/lib/angular/package.json","154c753f7e5682d6223defa212e66321"],["/lib/angularfire/bower.json","24e28852289208bf50ba7fc9cf9cfb06"],["/lib/firebase/bower.json","0275fdc2764d5a483cf3a6fa0ebe4893"],["/lib/ionic/css/ionic.css","1835baf222bae515552c33cf6dffab6b"],["/lib/ionic/css/ionic.min.css","893db9a1b633adb61ddf064e5314a509"],["/lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["/lib/ionic/fonts/ionicons.svg","621bd386841f74e0053cb8e67f8a0604"],["/lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["/lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["/lib/ionic/version.json","2090c5e7ae8cdeeef68908193515cd37"],["/lib/ngstorage/bower.json","3938cf7ab4848db65fbc432f4bd11d2b"],["/manifest.json","c10058c7db45a863aadb383f97a1cb03"],["/templates/brands.html","a652369b075aba0257d65717f21d2e3e"],["/templates/favourites.html","ae1e63d0f73948759767b8d515f96dac"],["/templates/gearList.html","c2e92e05aa003d011153a79ec6ad9d2c"],["/templates/kitOptimizer.html","1b8d865de9af08401b50ce71fb3f9393"],["/templates/menu.html","7e86a2ede77c1cca0938c7f6487d9665"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







