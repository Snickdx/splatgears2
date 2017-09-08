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

var precacheConfig = [["/css/ionic.app.css","28f6fcd195075e98d999a270073d2738"],["/css/main.css","e18ce9e38141d275e70a1f29fd806e87"],["/data/gear.json","e93fa6482b145e0c4e21371f2cafee72"],["/fonts/raleway/css/fonts.css","8b5057b049b6334828d340f08f9de40e"],["/fonts/raleway/fonts/Raleway-100/Raleway-100.ttf","19172697b6a56292329400af03186eda"],["/fonts/raleway/fonts/Raleway-100/Raleway-100.woff","af06b24211daae14856832e50438c69d"],["/fonts/raleway/fonts/Raleway-100italic/Raleway-100italic.ttf","a3e3fd28f7fbb501b0cb113ac5d51d22"],["/fonts/raleway/fonts/Raleway-100italic/Raleway-100italic.woff","cd96850eac91165c6ba9da40353d9e1f"],["/fonts/raleway/fonts/Raleway-200/Raleway-200.ttf","1755fb7d4cbce02555172bca710cb0d8"],["/fonts/raleway/fonts/Raleway-200/Raleway-200.woff","1d1ae2151a88c0f35b99433a005bc295"],["/fonts/raleway/fonts/Raleway-200italic/Raleway-200italic.ttf","54a450b86a251199cfb7ceca44eed1ff"],["/fonts/raleway/fonts/Raleway-200italic/Raleway-200italic.woff","170f27123bfe1991c7bf69882dbb5b1c"],["/fonts/raleway/fonts/Raleway-300/Raleway-300.ttf","041d98b686f76d723fe98439cedb2fef"],["/fonts/raleway/fonts/Raleway-300/Raleway-300.woff","9609023972d6e4d052c2bc58c8104470"],["/fonts/raleway/fonts/Raleway-300italic/Raleway-300italic.ttf","8e28922ebbca1a33cd5c98f358952ed6"],["/fonts/raleway/fonts/Raleway-300italic/Raleway-300italic.woff","8baafd6486a07cb91afa635bb63278fc"],["/fonts/raleway/fonts/Raleway-500/Raleway-500.ttf","974bf14323a6d201b432746a0b074bfb"],["/fonts/raleway/fonts/Raleway-500/Raleway-500.woff","61bdac9603ed743cc963d08d10d43035"],["/fonts/raleway/fonts/Raleway-500italic/Raleway-500italic.ttf","2f4fbef644b21b4a493ef14e43b856da"],["/fonts/raleway/fonts/Raleway-500italic/Raleway-500italic.woff","14c3ff5b290be0c91c3ac8bd7c939f97"],["/fonts/raleway/fonts/Raleway-600/Raleway-600.ttf","b429aaa604b2479ab9ab3a6b834f96d2"],["/fonts/raleway/fonts/Raleway-600/Raleway-600.woff","495cf0598c82ad1a1df7cd8c3a2fb277"],["/fonts/raleway/fonts/Raleway-600italic/Raleway-600italic.ttf","1d20b59314c1bf0ada11a90d11412dbe"],["/fonts/raleway/fonts/Raleway-600italic/Raleway-600italic.woff","b547d6883985fd6a29cb30ec289c3032"],["/fonts/raleway/fonts/Raleway-700/Raleway-700.ttf","b954e1fc424ea65dfe1dba0c24b5e0e4"],["/fonts/raleway/fonts/Raleway-700/Raleway-700.woff","f7645950eb8b995d0aa4887b65cc0197"],["/fonts/raleway/fonts/Raleway-700italic/Raleway-700italic.ttf","d994827834f53047e1156d53f45b25e3"],["/fonts/raleway/fonts/Raleway-700italic/Raleway-700italic.woff","634af4fcb715357922bcc68fa7516a9a"],["/fonts/raleway/fonts/Raleway-800/Raleway-800.ttf","7b991c0fd0092fcc0316a7c6c60d0aaf"],["/fonts/raleway/fonts/Raleway-800/Raleway-800.woff","7cd18714e1dd2a344929fcc175f0c06c"],["/fonts/raleway/fonts/Raleway-800italic/Raleway-800italic.ttf","565095f60b8212ea70e7d0076e8c1b0d"],["/fonts/raleway/fonts/Raleway-800italic/Raleway-800italic.woff","b565ea3e743b9cf10e43a0660fc35d60"],["/fonts/raleway/fonts/Raleway-900/Raleway-900.ttf","3eb86e793b971400c4a2966e12b9d024"],["/fonts/raleway/fonts/Raleway-900/Raleway-900.woff","fe871ff212c73f19a3fe7e9936cada31"],["/fonts/raleway/fonts/Raleway-900italic/Raleway-900italic.ttf","9c7573b1a019024bfa22c91da97d0924"],["/fonts/raleway/fonts/Raleway-900italic/Raleway-900italic.woff","839fd9f0d5b9b599acfa66403332a4e4"],["/fonts/raleway/fonts/Raleway-italic/Raleway-italic.ttf","3d47ee529a006578fd2be0819b9b08e4"],["/fonts/raleway/fonts/Raleway-italic/Raleway-italic.woff","9f292d6d9d6f45918e0073f7d460e464"],["/fonts/raleway/fonts/Raleway-regular/Raleway-regular.ttf","480bff6d5b503162dc823dab73ccfd18"],["/fonts/raleway/fonts/Raleway-regular/Raleway-regular.woff","65a0f1e7bab6cc723734bc83ee37b456"],["/img/TrgFHe9TkevBJe0MMRV0_abilities.png","af31335f99f08952d8db490a8fe34b90"],["/img/android-icon-144x144.png","af41e9d4ca24e2c42e7cc6072dbd115a"],["/img/android-icon-192x192.png","45719bf5a1d5e8b6040502aba99d3e7f"],["/img/android-icon-36x36.png","b380b78515a859ca4d3fd7559cb14a7f"],["/img/android-icon-48x48.png","d3b189e0a8beeb0b78364966fef88290"],["/img/android-icon-72x72.png","67c14cbfeb6e35ad6c39b962a9ba454b"],["/img/android-icon-96x96.png","690c2ffd32159b96c3cc09db1804a2fe"],["/img/apple-icon-120x120.png","f49be669a795e913edd7bff3a6357a18"],["/img/gear/60px-S2_Gear_Clothing_Anchor_Sweat.png","4952e310f424820b11c40c47f3588fbb"],["/img/gear/60px-S2_Gear_Clothing_Annaki_Drive_Tee.png","17703e2b385e3fbfe7bc17fe5ba1a2de"],["/img/gear/60px-S2_Gear_Clothing_Annaki_Evolution_Tee.png","4a1415b726c27a7ca6431145e7821874"],["/img/gear/60px-S2_Gear_Clothing_Armor_Jacket_Replica.png","7a76c412e4208c39998817b13a081b5c"],["/img/gear/60px-S2_Gear_Clothing_B-ball_Jersey_(Away).png","0d41656a567b72f919df19082ab0715a"],["/img/gear/60px-S2_Gear_Clothing_Baby-Jelly_Shirt.png","1ea6348dec820da70740b6e7b7b60598"],["/img/gear/60px-S2_Gear_Clothing_Baby-Jelly_Shirt_&_Tie.png","99bf5ab12db594cf2c222460c25434a5"],["/img/gear/60px-S2_Gear_Clothing_Basic_Tee.png","3876476b390a188f85f295d7b0f841c4"],["/img/gear/60px-S2_Gear_Clothing_Berry_Ski_Jacket.png","82a241af3a899ae098cfd1ecca00c1ec"],["/img/gear/60px-S2_Gear_Clothing_Birded_Corduroy_Jacket.png","8a43043e6e2ab2e3b659c5d0b150589c"],["/img/gear/60px-S2_Gear_Clothing_Black_Inky_Rider.png","50e549747cb75522c223b954e0bdc11b"],["/img/gear/60px-S2_Gear_Clothing_Black_LS.png","7b3a80be1103a01d720a540be642aea4"],["/img/gear/60px-S2_Gear_Clothing_Black_Squideye.png","3a71851f57ffd12f12e9bd83cb35762a"],["/img/gear/60px-S2_Gear_Clothing_Black_Tee.png","e4eae1f5ab195a70751e683db663440d"],["/img/gear/60px-S2_Gear_Clothing_Black_Urchin_Rock_Tee.png","338a620fcdd1a44bc53c2dd4e40f5f71"],["/img/gear/60px-S2_Gear_Clothing_Black_V-Neck_Tee.png","c496b13ebbf89b5f74b2abf9018b62d5"],["/img/gear/60px-S2_Gear_Clothing_Blue_Peaks_Tee.png","79b8adecd58e39777f374eef0e7249a3"],["/img/gear/60px-S2_Gear_Clothing_Blue_Sailor_Suit.png","3d8320d396b135939d1ed13dddd8395c"],["/img/gear/60px-S2_Gear_Clothing_Blue_Tentatek_Tee.png","ebae0e3d0f7edc12dc398b0b3ed5df0f"],["/img/gear/60px-S2_Gear_Clothing_Brown_FA-11_Bomber.png","8b7068aed992670f87333f73f54686a9"],["/img/gear/60px-S2_Gear_Clothing_Camo_Zip_Hoodie.png","bcf36689a0d572e786c53ccaa451f24a"],["/img/gear/60px-S2_Gear_Clothing_Chilly_Mountain_Coat.png","85a23e94623f81c749d347159d21e6fa"],["/img/gear/60px-S2_Gear_Clothing_Chirpy_Chips_Band_Tee.png","de3debf8dd03717654ccfdf2947f3446"],["/img/gear/60px-S2_Gear_Clothing_Choco_Layered_LS.png","4596ac6df6cd7f0e8cbdfffbe7ec9ff3"],["/img/gear/60px-S2_Gear_Clothing_Crimson_Parashooter.png","928679eeef98f39f2395de9420eb09aa"],["/img/gear/60px-S2_Gear_Clothing_Cycle_King_Jersey.png","efba6b271105dc6399a4b538219e4454"],["/img/gear/60px-S2_Gear_Clothing_Dark_Urban_Vest.png","86d23afb53f6567c794b5b6323058145"],["/img/gear/60px-S2_Gear_Clothing_Eggplant_Mountain_Coat.png","5190cac697690bc5ead8cf2bf0dadd2f"],["/img/gear/60px-S2_Gear_Clothing_FA-01_Jacket.png","9d94da2e3bbbfcc3471ade602f7383c4"],["/img/gear/60px-S2_Gear_Clothing_FA-01_Reversed.png","d135cb4e23e86a0a1e3468d15dab338e"],["/img/gear/60px-S2_Gear_Clothing_FC_Albacore.png","64e0766e84325b129f551bcf526c34ae"],["/img/gear/60px-S2_Gear_Clothing_Fugu_Tee.png","b3b74f0448c678540485622b6ceecb6d"],["/img/gear/60px-S2_Gear_Clothing_Grape_Hoodie.png","9b290636a1c6fa8220debf00578e3ece"],["/img/gear/60px-S2_Gear_Clothing_Gray_8-Bit_FishFry.png","9c25edf18d679cd9258f2ed5f5e1106a"],["/img/gear/60px-S2_Gear_Clothing_Gray_FA-11_Bomber.png","3168f6e8f5bd33295059ea251525afb1"],["/img/gear/60px-S2_Gear_Clothing_Gray_Hoodie.png","4c664fdafca9a61054f31e82f9542fb3"],["/img/gear/60px-S2_Gear_Clothing_Green-Check_Shirt.png","1a5d965b26b285cb99092d7971bfb4b9"],["/img/gear/60px-S2_Gear_Clothing_Green_Tee.png","bf4b089c5343c4cc63d9577276a6b5c1"],["/img/gear/60px-S2_Gear_Clothing_Green_V-Neck_Limited_Tee.png","1a1ad1ba78622d263e301d9b8053228d"],["/img/gear/60px-S2_Gear_Clothing_Half-Sleeve_Sweater.png","4ee6b216cb75bb2d1c4cd171b79bd1fd"],["/img/gear/60px-S2_Gear_Clothing_Hero_Hoodie_Replica.png","c4c9f63728611e7e4aa8e48ff81e05b7"],["/img/gear/60px-S2_Gear_Clothing_Hero_Jacket_Replica.png","6def37c09a3008b4abf6af0e79ee9873"],["/img/gear/60px-S2_Gear_Clothing_Hightide_Era_Band_Tee.png","7bf916ce2da85111671a9bfb35bf7b9f"],["/img/gear/60px-S2_Gear_Clothing_Hula_Punk_Shirt.png","a2afbeb76fe69c69b97353b61ef70ccd"],["/img/gear/60px-S2_Gear_Clothing_Inkfall_Shirt.png","243ad533cb54fb4e5e9ace3b38eba3ce"],["/img/gear/60px-S2_Gear_Clothing_Inkopolis_Squaps_Jersey.png","a60e5250d9cea4152607720c937ece30"],["/img/gear/60px-S2_Gear_Clothing_King_Jersey.png","8824ebc2af87fb2d00c5b69bbc26f370"],["/img/gear/60px-S2_Gear_Clothing_Layered_Anchor_LS.png","c5d7130b9fecb134ccc502ed33268a1d"],["/img/gear/60px-S2_Gear_Clothing_Layered_Vector_LS.png","601618211604246c0dc637ea4911cb5b"],["/img/gear/60px-S2_Gear_Clothing_Lime_Easy-Stripe_Shirt.png","53f0593e0996196f1e247acdf671e97a"],["/img/gear/60px-S2_Gear_Clothing_Logo_Aloha_Shirt.png","87f99ef12696e2a05049f1a13fc6fcb4"],["/img/gear/60px-S2_Gear_Clothing_Matcha_Down_Jacket.png","da8363668bc431207bda0872fca210f4"],["/img/gear/60px-S2_Gear_Clothing_Mint_Tee.png","4bace5a3914a3ed6ec3355ecc9bc9714"],["/img/gear/60px-S2_Gear_Clothing_Mister_Shrug_Tee.png","5c63b8f9fa0aacdf0cf400776b9bffe1"],["/img/gear/60px-S2_Gear_Clothing_Navy_Deca_Logo_Tee.png","55d6ae9c83eaa21a2b25d98785f096f2"],["/img/gear/60px-S2_Gear_Clothing_Navy_King_Tank.png","a4fc329c38904408578b3063912697c2"],["/img/gear/60px-S2_Gear_Clothing_Navy_Striped_LS.png","16eb58d25a6959c2d3956de14758e21f"],["/img/gear/60px-S2_Gear_Clothing_Negative_Longcuff_Sweater.png","082672b8c57a966be6cbeec31774dec5"],["/img/gear/60px-S2_Gear_Clothing_Octobowler_Shirt.png","3e1b256086231cc603fca3a9e0cba137"],["/img/gear/60px-S2_Gear_Clothing_Pink_Easy-Stripe_Shirt.png","442070a16aa8620ded17b1cf2bab472a"],["/img/gear/60px-S2_Gear_Clothing_Positive_Longcuff_Sweater.png","07dddce3d0479939ada4294914c9f7ed"],["/img/gear/60px-S2_Gear_Clothing_Power_Armor.png","e9de6f90fb9a72568e7c4e574149206c"],["/img/gear/60px-S2_Gear_Clothing_Power_Armor_Mk_I.png","eb7132a8ebdeec5c83a58d7d4865b2ad"],["/img/gear/60px-S2_Gear_Clothing_Prune_Parashooter.png","526017237db85348d1aa9cde8883342c"],["/img/gear/60px-S2_Gear_Clothing_Pullover_Coat.png","475c826267f0870e8e6ee2a98e2f8f63"],["/img/gear/60px-S2_Gear_Clothing_Purple_Camo_LS.png","a5f00ee601d09a2ff5859d6439463e66"],["/img/gear/60px-S2_Gear_Clothing_Red_Tentatek_Tee.png","d831d46589438e35cd1175b78e91d442"],["/img/gear/60px-S2_Gear_Clothing_Red_V-Neck_Limited_Tee.png","6a90613732b3e6d08772d2b851ca3292"],["/img/gear/60px-S2_Gear_Clothing_Red_Vector_Tee.png","ec1ab6a3b563fde5cd34b4bab73e2060"],["/img/gear/60px-S2_Gear_Clothing_Reel_Sweat.png","81b3ca9f115ce2c60665170ed9b9d499"],["/img/gear/60px-S2_Gear_Clothing_Retro_Sweat.png","ff5b307a47045ea7ee8cee7a23b6092d"],["/img/gear/60px-S2_Gear_Clothing_Sailor-Stripe_Tee.png","56d808bf208c11ef39aef5d51846afa5"],["/img/gear/60px-S2_Gear_Clothing_Samurai_Jacket.png","dc2d46416c37d0226532105733ce39a9"],["/img/gear/60px-S2_Gear_Clothing_School_Cardigan.png","e6378b8c3223892de91a6c9973917612"],["/img/gear/60px-S2_Gear_Clothing_School_Uniform.png","8de0c7112ff32291c0144bb173f146bc"],["/img/gear/60px-S2_Gear_Clothing_Shirt_&_Tie.png","e648da918716bd569de2478fa5024427"],["/img/gear/60px-S2_Gear_Clothing_Shirt_with_Blue_Hoodie.png","c57a821b11c5afcf48f89395ba6ba457"],["/img/gear/60px-S2_Gear_Clothing_Short_Knit_Layers.png","576f3a2f209b508fc2b982b189d8947f"],["/img/gear/60px-S2_Gear_Clothing_Shrimp-Pink_Polo.png","7e9d9ed592b353c1797747656bd1f302"],["/img/gear/60px-S2_Gear_Clothing_Slash_King_Tank.png","fae3d6eb62ba2998f275730fcc9b0dab"],["/img/gear/60px-S2_Gear_Clothing_Slipstream_United.png","8372c5c0a8356ea241d2c29366450fd9"],["/img/gear/60px-S2_Gear_Clothing_Splatfest_Tee.png","3c1fbe8a903724b39480a31aa052c2b2"],["/img/gear/60px-S2_Gear_Clothing_Squid_Satin_Jacket.png","1fc9de664e701029c4733f1c70267c96"],["/img/gear/60px-S2_Gear_Clothing_Squid_Squad_Band_Tee.png","4e817b8c9209404d8ea10d01a7cfaa42"],["/img/gear/60px-S2_Gear_Clothing_Squiddor_Polo.png","379860f31db64631d6e6153817532cca"],["/img/gear/60px-S2_Gear_Clothing_Squinja_Suit.png","6028c93a2988338637fbb543fd496b55"],["/img/gear/60px-S2_Gear_Clothing_Sunny-Day_Tee.png","ff8aece8797ad9dc0e740c6e793554df"],["/img/gear/60px-S2_Gear_Clothing_Takoroka_Windcrusher.png","9badd199150d14c3ff69d487f308d184"],["/img/gear/60px-S2_Gear_Clothing_Urchins_Jersey.png","3aaa43e329684a6533e3564d39f3eb19"],["/img/gear/60px-S2_Gear_Clothing_Varsity_Jacket.png","7e333f6e81544263364972481845a2ad"],["/img/gear/60px-S2_Gear_Clothing_Vintage_Check_Shirt.png","42bd6217d5ecf0440ed7cfd1d7d2a9a4"],["/img/gear/60px-S2_Gear_Clothing_Wet_Floor_Band_Tee.png","8be31f313e9ffe77b97aa3a5a2a5cb51"],["/img/gear/60px-S2_Gear_Clothing_White_8-Bit_FishFry.png","32ed2820d145f43a32c782224c7a8306"],["/img/gear/60px-S2_Gear_Clothing_White_Anchor_Tee.png","9f60797642742b2e78f43b4ed63ab718"],["/img/gear/60px-S2_Gear_Clothing_White_Baseball_LS.png","e574c5db1ac3a8ae87b2739f4dd7c203"],["/img/gear/60px-S2_Gear_Clothing_White_Deca_Logo_Tee.png","cdd5715a977a6d0636fd7000b3fa0979"],["/img/gear/60px-S2_Gear_Clothing_White_Inky_Rider.png","361bfae9cefd72c282d04ea3bf9b3343"],["/img/gear/60px-S2_Gear_Clothing_White_King_Tank.png","4c934679df9df79193f94dc183275447"],["/img/gear/60px-S2_Gear_Clothing_White_Tee.png","e04f9011c4d362c900aef31bd650c79e"],["/img/gear/60px-S2_Gear_Clothing_White_Urchin_Rock_Tee.png","f459dd22b0a6b521e8a63fcf82cdf441"],["/img/gear/60px-S2_Gear_Clothing_White_V-Neck_Tee.png","3e5d95bf5fbd2e4a1a887bb3824f64e3"],["/img/gear/60px-S2_Gear_Clothing_Yellow_Layered_LS.png","c6af0a92e7fbb43dae060c576abdfda0"],["/img/gear/60px-S2_Gear_Clothing_Yellow_Urban_Vest.png","7906e63588cc1e0cfbc44a7efeec3a33"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Baseball_LS.png","26ca13d811eb58cd93e8a2ceaa1fafa7"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Hoodie.png","a82454b623624082a995f9c62f6851d5"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Jade_Coat.png","12122b4eb7d656861dd12b3d69250b16"],["/img/gear/60px-S2_Gear_Clothing_Zekko_Redleaf_Coat.png","5cf9d5373f6003c07e10d76589ccbcba"],["/img/gear/60px-S2_Gear_Clothing_Zink_Layered_LS.png","bc90a402b4a147c46a22e6ded9a8fd2d"],["/img/gear/60px-S2_Gear_Headgear_18K_Aviators.png","b09fb22d2f42d79f670a1aad4c0946ec"],["/img/gear/60px-S2_Gear_Headgear_Annaki_Beret.png","b8386450cae21faf7c24ad17bd49f37c"],["/img/gear/60px-S2_Gear_Headgear_Annaki_Mask.png","10264ccd0933d92cc4d2e362e6edb1c7"],["/img/gear/60px-S2_Gear_Headgear_Armor_Helmet_Replica.png","9293a07ca4399ed073c98715b38a2610"],["/img/gear/60px-S2_Gear_Headgear_Backwards_Cap.png","88f26a26f709ca32890980c96bfbd65a"],["/img/gear/60px-S2_Gear_Headgear_Bamboo_Hat.png","a44f27f7e72d29cc604b2f2814ffcd97"],["/img/gear/60px-S2_Gear_Headgear_Bike_Helmet.png","4f272dbf99cdf82c5a3a450f6033ac1f"],["/img/gear/60px-S2_Gear_Headgear_Blowfish_Bell_Hat.png","53e00cf0be0d1a18d719c19f7226154f"],["/img/gear/60px-S2_Gear_Headgear_Bobble_Hat.png","d43782f8150ef8b714ebafe471e1f449"],["/img/gear/60px-S2_Gear_Headgear_Bucket_Hat.png","56e2dc433c7e0b3d8bd6224c20782360"],["/img/gear/60px-S2_Gear_Headgear_Camo_Mesh.png","7f0ea8e8bca10a3dd4261b9a81bad8fa"],["/img/gear/60px-S2_Gear_Headgear_Camping_Hat.png","c70db2a5e475891fb5fbcfbce0f38cfb"],["/img/gear/60px-S2_Gear_Headgear_Cycle_King_Cap.png","8600ff3abf54c079a48753e6a687d289"],["/img/gear/60px-S2_Gear_Headgear_Fake_Contacts.png","775e4fdcf128ee84369eecd2a0d41121"],["/img/gear/60px-S2_Gear_Headgear_Firefin_Facemask.png","7eb1fbb1a25cd6b58f4e0c6a114e30c4"],["/img/gear/60px-S2_Gear_Headgear_FishFry_Visor.png","e88e86655708be15e38d2a655f536c07"],["/img/gear/60px-S2_Gear_Headgear_Five-Panel_Cap.png","6bab5fb16a093144fddc002efe277f3c"],["/img/gear/60px-S2_Gear_Headgear_Half-Rim_Glasses.png","0bce92720146ae302b3646db25200a3e"],["/img/gear/60px-S2_Gear_Headgear_Headlamp_Helmet.png","9ac066afa2c9e95c2bd1967ead15f861"],["/img/gear/60px-S2_Gear_Headgear_Hero_Headphones_Replica.png","867b990b38e6fcd161b11a876b1215f3"],["/img/gear/60px-S2_Gear_Headgear_Hero_Headset_Replica.png","60f4c85c7e4e6264df1308904f8cc5ab"],["/img/gear/60px-S2_Gear_Headgear_Hickory_Work_Cap.png","983b8b5238e04e8b22c7e04b23ac31df"],["/img/gear/60px-S2_Gear_Headgear_Hockey_Helmet.png","35156eca1798479a4748b45c64db1bc1"],["/img/gear/60px-S2_Gear_Headgear_Jellyvader_Cap.png","da274ad4440e5de8b9364089bae6afb6"],["/img/gear/60px-S2_Gear_Headgear_King_Facemask.png","8981c8a424414408e5f8cc671fe383de"],["/img/gear/60px-S2_Gear_Headgear_King_Flip_Mesh.png","59b5b4d5634a26099ff70be4bb0257e9"],["/img/gear/60px-S2_Gear_Headgear_Knitted_Hat.png","0651bc19479e8987a1dafa3f0c04e543"],["/img/gear/60px-S2_Gear_Headgear_Lightweight_Cap.png","7dbab5a6660c4ea68d9c59e3ff2896a2"],["/img/gear/60px-S2_Gear_Headgear_MTB_Helmet.png","6a6f62e043f095cd19c91f07583ed701"],["/img/gear/60px-S2_Gear_Headgear_Noise_Cancelers.png","52062094d33234a51ef97b27219ebc9e"],["/img/gear/60px-S2_Gear_Headgear_Paintball_Mask.png","b5b44fa9f580faa6f4583f0913054691"],["/img/gear/60px-S2_Gear_Headgear_Painter's_Mask.png","824b31972f61f7446e1e51d969d123b6"],["/img/gear/60px-S2_Gear_Headgear_Patched_Hat.png","396e083baac0ec8ad165e62751c9182d"],["/img/gear/60px-S2_Gear_Headgear_Pilot_Goggles.png","7a15dd8f7dfa866ea9a92c2d6c68c816"],["/img/gear/60px-S2_Gear_Headgear_Power_Mask.png","0f355b70f74cf0559d3cb763f951996f"],["/img/gear/60px-S2_Gear_Headgear_Power_Mask_Mk_I.png","4725b23a652bdb45e73b14465cf5e80e"],["/img/gear/60px-S2_Gear_Headgear_Retro_Specs.png","e5a2d771365b55aa6a37a430f96cbb2d"],["/img/gear/60px-S2_Gear_Headgear_Safari_Hat.png","c80d76d9eac347b9c30545bd8713eab4"],["/img/gear/60px-S2_Gear_Headgear_Samurai_Helmet.png","0cac4f82b4720772664a6f0bdaf237ff"],["/img/gear/60px-S2_Gear_Headgear_Skull_Bandana.png","86ceeb623069b68285b9625113795e87"],["/img/gear/60px-S2_Gear_Headgear_Snorkel_Mask.png","bcdeb7a54c6b1b880835819ec2acddd3"],["/img/gear/60px-S2_Gear_Headgear_Soccer_Headband.png","690a549254fb378ff095fa19a3b8cbb9"],["/img/gear/60px-S2_Gear_Headgear_Special_Forces_Beret.png","5e881885c9e32bd795329746fd378aed"],["/img/gear/60px-S2_Gear_Headgear_Squash_Headband.png","5248ad0b8e105002b0d9006659200d88"],["/img/gear/60px-S2_Gear_Headgear_Squid_Clip-Ons.png","a355fc6d60bf9b682fa135f81a8a9a92"],["/img/gear/60px-S2_Gear_Headgear_Squid_Facemask.png","feccd581a599f0666708da527ecca83a"],["/img/gear/60px-S2_Gear_Headgear_Squid_Hairclip.png","3f960faac855f26258527fde46959d0a"],["/img/gear/60px-S2_Gear_Headgear_Squidfin_Hook_Cans.png","1aa0febbd99bb4266fdde87fecc8f9c1"],["/img/gear/60px-S2_Gear_Headgear_Squidvader_Cap.png","659cb4aef75a143e45c90af49f948e5d"],["/img/gear/60px-S2_Gear_Headgear_Squinja_Mask.png","80583ece89c334673ddebb11973b7e63"],["/img/gear/60px-S2_Gear_Headgear_Straw_Boater.png","addadf24d17adf88f016ab8f76525d79"],["/img/gear/60px-S2_Gear_Headgear_Striped_Beanie.png","8a10b2a7224f88703866e8485be36723"],["/img/gear/60px-S2_Gear_Headgear_Studio_Headphones.png","36ca8dcd716813dd5f3cc16ae295a766"],["/img/gear/60px-S2_Gear_Headgear_Sun_Visor.png","48208de33422b317c7ca98e9ad02d99e"],["/img/gear/60px-S2_Gear_Headgear_Takoroka_Mesh.png","2575c74923eece5ac143baa21bee59e7"],["/img/gear/60px-S2_Gear_Headgear_Takoroka_Visor.png","d2b2cc8501504632ecff443584aaf1b0"],["/img/gear/60px-S2_Gear_Headgear_Tennis_Headband.png","149c3c9434bb78a3bb9abecb92393a45"],["/img/gear/60px-S2_Gear_Headgear_Tinted_Shades.png","b1b5b8816b1347c3fa2e4b0cfeec9453"],["/img/gear/60px-S2_Gear_Headgear_Urchins_Cap.png","d71e49fedc1c64f0b0b03d9c6268feff"],["/img/gear/60px-S2_Gear_Headgear_Visor_Skate_Helmet.png","dc3ca719acabdeb44445a26eef922949"],["/img/gear/60px-S2_Gear_Headgear_White_Headband.png","7251e65783466fbe053e007f9193ad94"],["/img/gear/60px-S2_Gear_Shoes_Acerola_Rain_Boots.png","8ebca377775e29e2e66e9e107391ef3a"],["/img/gear/60px-S2_Gear_Shoes_Armor_Boot_Replicas.png","b1625445e169633b73467cfe7fef1193"],["/img/gear/60px-S2_Gear_Shoes_Arrow_Pull-Ons.png","705d3e3d4a63ac9515db6817c5032c20"],["/img/gear/60px-S2_Gear_Shoes_Birch_Climbing_Shoes.png","5b0a64606fb4d7eacd69025c716315e9"],["/img/gear/60px-S2_Gear_Shoes_Black_Dakroniks.png","412cf16cb82265958c3fdaaf86522f54"],["/img/gear/60px-S2_Gear_Shoes_Black_Flip-Flops.png","7f75ae51a87f04c6468a7d20b2ae06ac"],["/img/gear/60px-S2_Gear_Shoes_Black_Norimaki_750s.png","a77f7bb317cdf32dd376b5256f32745b"],["/img/gear/60px-S2_Gear_Shoes_Black_Trainers.png","815d3494874b54ac4f75fbebdd2fe363"],["/img/gear/60px-S2_Gear_Shoes_Blue_&_Black_Squidkid_IV.png","7419d8e9257f84f2c02e932d38474549"],["/img/gear/60px-S2_Gear_Shoes_Blue_Moto_Boots.png","cfaba6751503422071a5284cccef610d"],["/img/gear/60px-S2_Gear_Shoes_Blue_Slip-Ons.png","993130e60a88b02b6a92529d844c6002"],["/img/gear/60px-S2_Gear_Shoes_Blueberry_Casuals.png","ddd1cb190460f392f68793e1c8eef986"],["/img/gear/60px-S2_Gear_Shoes_Canary_Trainers.png","81093b34f26a7be38b587eb96b08b1ac"],["/img/gear/60px-S2_Gear_Shoes_Cherry_Kicks.png","8d7626910a4fc762553ad957d8308c1d"],["/img/gear/60px-S2_Gear_Shoes_Choco_Clogs.png","b5a3cfd32404b8ae81935a1b7dd7c8e0"],["/img/gear/60px-S2_Gear_Shoes_Crazy_Arrows.png","afc393d03056610e8faa2104dc537e03"],["/img/gear/60px-S2_Gear_Shoes_Cream_Basics.png","cb2d9eacf36f8d9a7d1e56b023970081"],["/img/gear/60px-S2_Gear_Shoes_Fringed_Loafers.png","e596b15d044afbcaf303ac5f0d2bfc7e"],["/img/gear/60px-S2_Gear_Shoes_Gold_Hi-Horses.png","73854add62982bf809bf1ce241bc1966"],["/img/gear/60px-S2_Gear_Shoes_Gray_Sea-Slug_Hi-Tops.png","c672b3e1e67c923713261750e6b4fe98"],["/img/gear/60px-S2_Gear_Shoes_Hero_Runner_Replicas.png","1b8c99db5655686fe1a4f5e5606f8cfe"],["/img/gear/60px-S2_Gear_Shoes_Hero_Snowboots_Replicas.png","a871ba2100208345c5e14f432434a94a"],["/img/gear/60px-S2_Gear_Shoes_Hunter_Hi-Tops.png","1f696026fb7a29fa046d72a3bdc3b155"],["/img/gear/60px-S2_Gear_Shoes_Hunting_Boots.png","3fbaf64897c6cd044cf66e7abf2a3fe0"],["/img/gear/60px-S2_Gear_Shoes_Kid_Clams.png","994ee914c3e202806d3dc28169b49856"],["/img/gear/60px-S2_Gear_Shoes_LE_Soccer_Shoes.png","d231cf4f8a6f413264f7ae326377523e"],["/img/gear/60px-S2_Gear_Shoes_Mawcasins.png","8b7288b9976ca8243b0020ea2e3aae6a"],["/img/gear/60px-S2_Gear_Shoes_Mint_Dakroniks.png","b7e020f5472c337f6ffea02c0851efa5"],["/img/gear/60px-S2_Gear_Shoes_Moto_Boots.png","d10201e73f1df36915bdf63255593bcc"],["/img/gear/60px-S2_Gear_Shoes_Neon_Delta_Straps.png","28ded9303e932501444cdf0ba91e6986"],["/img/gear/60px-S2_Gear_Shoes_Neon_Sea_Slugs.png","2829cc473fd82ae7ff11498fb31f30e4"],["/img/gear/60px-S2_Gear_Shoes_Orange_Arrows.png","53661ebdf1936c225b57d893f185a514"],["/img/gear/60px-S2_Gear_Shoes_Orca_Hi-Tops.png","6af124f9f02cd221a073248276a70f00"],["/img/gear/60px-S2_Gear_Shoes_Oyster_Clogs.png","27b11e5c9e0b3dc5d7cd631b93838f0f"],["/img/gear/60px-S2_Gear_Shoes_Pink_Trainers.png","4e3db5f9243c1e87d941e6348a151126"],["/img/gear/60px-S2_Gear_Shoes_Piranha_Moccasins.png","a6b011a6a07a41fd26fe658e76f02012"],["/img/gear/60px-S2_Gear_Shoes_Plum_Casuals.png","2f9a9fa4e0fece8d02454b0944cbd936"],["/img/gear/60px-S2_Gear_Shoes_Power_Boots.png","309be61357a535c32503c15a81ae98bb"],["/img/gear/60px-S2_Gear_Shoes_Power_Boots_Mk_I.png","ce63fed4c298bcc344a6a92e31ec077f"],["/img/gear/60px-S2_Gear_Shoes_Pro_Trail_Boots.png","0f0c0ed617b6c90a18278a137ff61ea7"],["/img/gear/60px-S2_Gear_Shoes_Punk_Blacks.png","5a3f5f00deb6018e26cfe591959aa9f0"],["/img/gear/60px-S2_Gear_Shoes_Punk_Whites.png","0e1ae6127914dcd8c4acab274376b6be"],["/img/gear/60px-S2_Gear_Shoes_Purple_Hi-Horses.png","56c4dcea26e996c80d049257a71365ea"],["/img/gear/60px-S2_Gear_Shoes_Purple_Sea_Slugs.png","bb22c4cffbc668f6891a9483a807631b"],["/img/gear/60px-S2_Gear_Shoes_Red-Mesh_Sneakers.png","61df04a4fdc11ca50f10470c49df2e5f"],["/img/gear/60px-S2_Gear_Shoes_Red_&_Black_Squidkid_IV.png","a116a6e949a77674e633b1dcda17bc79"],["/img/gear/60px-S2_Gear_Shoes_Red_Hi-Horses.png","d9c6c8efdd4271b84b47b342ed6db304"],["/img/gear/60px-S2_Gear_Shoes_Roasted_Brogues.png","070de1c6b1978c67dd6d661a8ff44380"],["/img/gear/60px-S2_Gear_Shoes_Samurai_Shoes.png","e64e31b690f5cc7b47f30a7ee38a6c28"],["/img/gear/60px-S2_Gear_Shoes_School_Shoes.png","ff98adc6f3177211755ec31899481ed4"],["/img/gear/60px-S2_Gear_Shoes_Smoky_Wingtips.png","745f5d70f030f4d70d79d48378dbe3bc"],["/img/gear/60px-S2_Gear_Shoes_Snow_Delta_Straps.png","057212019d262ba28244989e4825d06c"],["/img/gear/60px-S2_Gear_Shoes_Squinja_Boots.png","f40f6d2263676f5792f35380f7b8e963"],["/img/gear/60px-S2_Gear_Shoes_Strapping_Reds.png","03a360483a2428c607b02fc260e63db7"],["/img/gear/60px-S2_Gear_Shoes_Strapping_Whites.png","ce6b5036e051077952a33d27a92bdf1f"],["/img/gear/60px-S2_Gear_Shoes_Sunny_Climbing_Shoes.png","306dec0a30542b6b50e3ef44718e5383"],["/img/gear/60px-S2_Gear_Shoes_Sunset_Orca_Hi-Tops.png","d8b1bfcd8bcc27d4f02accf460c503e0"],["/img/gear/60px-S2_Gear_Shoes_Trail_Boots.png","9e94078b9a2faeb0b0ef663b292bbb0d"],["/img/gear/60px-S2_Gear_Shoes_White_Kicks.png","afe38c80e988b6b19f4e129ace36ef99"],["/img/gear/60px-S2_Gear_Shoes_White_Norimaki_750s.png","b4e04ca316ef344a4b3c152f6111d459"],["/img/gear/60px-S2_Gear_Shoes_White_Seahorses.png","c91b94460a78592a013d3603807aef34"],["/img/gear/60px-S2_Gear_Shoes_Yellow-Mesh_Sneakers.png","9479f78564f9c49f87d4b5fd3769935d"],["/index.html","5bfe44016c6d663c453f48b8b1cd602b"],["/js/app.js","ed938b778836e0d4e0abd1a42a7978e8"],["/js/controllers.js","d05ccce2ed2e60d00466b38fe3ff9fc6"],["/js/directives.js","eaaa763ca5e3fe8b2b33cdfd80fc464f"],["/js/keys.js","c16642fb0390af617ff686e21b863027"],["/js/routes.js","5706cb62279b620b0a9fcdf8d34f64eb"],["/js/services.js","d96c5f85c9a374ebe28fb93924186dbc"],["/lib/angular/angular-csp.css","de6110463ed5001dd95aa3bbbc7c129c"],["/lib/angular/angular.js","ef055437e8fe9623189119fa6b858b4c"],["/lib/angular/angular.min.js","a706ca14720086f417910e2eb1e60ec3"],["/lib/angular/bower.json","34c734ce40065a6f97211711915775cd"],["/lib/angular/index.js","0d848853205d22ab8be985876aec948a"],["/lib/angular/package.json","154c753f7e5682d6223defa212e66321"],["/lib/angularfire/bower.json","24e28852289208bf50ba7fc9cf9cfb06"],["/lib/angularfire/dist/angularfire.js","fdeeea1d10368cd1a3227d6ce7a67cf6"],["/lib/angularfire/dist/angularfire.min.js","5e136c4b28e4c328a30a785a4e2a8636"],["/lib/firebase/bower.json","0275fdc2764d5a483cf3a6fa0ebe4893"],["/lib/firebase/firebase-app-externs.js","8ef2c9a4b68724cca4d1b2f8a6a02d3d"],["/lib/firebase/firebase-app.js","01cf01b0a6ca5c6b789ad992bb3a2260"],["/lib/firebase/firebase-auth-externs.js","e7f384d08d7a89d3cc2da1fbbe7a00c6"],["/lib/firebase/firebase-auth.js","45eb86d7de447b4d13c739c21a49a968"],["/lib/firebase/firebase-database-externs.js","a8c3b1e72d16225137c41f18fae482ae"],["/lib/firebase/firebase-database.js","d282583e4c878c746120465e99a3db4e"],["/lib/firebase/firebase-messaging-externs.js","9c98a5b4c352855726b4e5929a1ed69a"],["/lib/firebase/firebase-messaging.js","3025203a50a641644b3c691f1697dd06"],["/lib/firebase/firebase-storage-externs.js","afcc1c85186345fbbec7e73f5dce11e7"],["/lib/firebase/firebase-storage.js","0cd9f1ab79e90bf5c9378cce943763e2"],["/lib/firebase/firebase.js","8fb5fe6e40c039c0a21e4cea68370393"],["/lib/ionic/css/ionic.css","1835baf222bae515552c33cf6dffab6b"],["/lib/ionic/css/ionic.min.css","893db9a1b633adb61ddf064e5314a509"],["/lib/ionic/fonts/ionicons.eot","2c2ae068be3b089e0a5b59abb1831550"],["/lib/ionic/fonts/ionicons.svg","621bd386841f74e0053cb8e67f8a0604"],["/lib/ionic/fonts/ionicons.ttf","24712f6c47821394fba7942fbb52c3b2"],["/lib/ionic/fonts/ionicons.woff","05acfdb568b3df49ad31355b19495d4a"],["/lib/ionic/js/angular-ui/angular-ui-router.js","1f7fe3573d463743394e98d8b00eb228"],["/lib/ionic/js/angular-ui/angular-ui-router.min.js","83f32131b638a8686a43510fbd645b1b"],["/lib/ionic/js/angular/angular-animate.js","b1a0315d4738ba305aca3b00146e232c"],["/lib/ionic/js/angular/angular-animate.min.js","fb61c6d539943f24f85f49cad4c187b5"],["/lib/ionic/js/angular/angular-resource.js","523cfbb962e367e90da4bf1976b53d7f"],["/lib/ionic/js/angular/angular-resource.min.js","8da982bb4bc3275659b4c081f34f9b7c"],["/lib/ionic/js/angular/angular-sanitize.js","7b57f04a2b23847203394400eeb2c97d"],["/lib/ionic/js/angular/angular-sanitize.min.js","04a7b73d1dc5d573a5b17d70122e8781"],["/lib/ionic/js/angular/angular.js","1b3d5bfbeb67c93df0f8ee9de569a206"],["/lib/ionic/js/angular/angular.min.js","0744b6e5cd7b7cdad98cefb3d9c141c6"],["/lib/ionic/js/ionic-angular.js","b9f40cc1dbc2d8b5fffbd59d2714ba40"],["/lib/ionic/js/ionic-angular.min.js","efc0aa8f5a9b7eabcfce7e36cae57e68"],["/lib/ionic/js/ionic.bundle.min.js","b46d366b4160a1a81b7944a1dcf822c2"],["/lib/ionic/js/ionic.js","47b98a8c910b59b65c66997ea3cb68a6"],["/lib/ionic/js/ionic.min.js","d651a0c6df47f361e188d3275fec5852"],["/lib/ionic/version.json","2090c5e7ae8cdeeef68908193515cd37"],["/lib/ionicuirouter/ionicUIRouter.js","3eba2e7c39bf048a435f0105540b4d86"],["/lib/ngstorage/bower.json","3938cf7ab4848db65fbc432f4bd11d2b"],["/lib/ngstorage/ngStorage.js","587579c86a0ccf812c91ecb5905d98b6"],["/lib/ngstorage/ngStorage.min.js","ee45fc1dc996fc2033bc24c058f95fe4"],["/lib/ngstorage/package.js","62510ac35f392608ce18bf7872570f0b"],["/manifest.json","c10058c7db45a863aadb383f97a1cb03"],["/optimizer.js","b07890fec881ce845be9d7dce7508938"],["/templates/brands.html","a652369b075aba0257d65717f21d2e3e"],["/templates/favourites.html","ae1e63d0f73948759767b8d515f96dac"],["/templates/gearList.html","7559b6bf31fa55af325784ac62a82373"],["/templates/kitOptimizer.html","410df4f368cbbc13bc8e7dd9e7a6196a"],["/templates/menu.html","7e86a2ede77c1cca0938c7f6487d9665"]];
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







