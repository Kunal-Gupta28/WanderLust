const fs = require("fs");
const path = require("path");

const CATEGORIES_DATA = {
  "Mountains": {
    imagePool: [
      "photo-1510798831971-661eb04b3739",
      "photo-1518022525094-218670c9b745",
      "photo-1449158743715-0a90ebb6d2d8",
      "photo-1464822759023-fed622ff2c3b",
      "photo-1486870591958-9b9d0d1dda99",
      "photo-1506744038136-46273834b3fb",
      "photo-1542718610-a1d656d1884c"
    ],
    locations: [
      { loc: "Manali", country: "India", coords: [77.1892, 32.2432] },
      { loc: "Zanskar", country: "India", coords: [76.9806, 33.4862] },
      { loc: "Mukteshwar", country: "India", coords: [79.6455, 29.4722] },
      { loc: "Gulmarg", country: "India", coords: [74.3805, 34.0484] },
      { loc: "Tirthan Valley", country: "India", coords: [77.3456, 31.6382] },
      { loc: "Zermatt", country: "Switzerland", coords: [7.7491, 45.9765] },
      { loc: "Chamonix", country: "France", coords: [6.8694, 45.9237] },
      { loc: "Innsbruck", country: "Austria", coords: [11.4041, 47.2692] },
      { loc: "Banff", country: "Canada", coords: [-115.5708, 51.1784] },
      { loc: "Queenstown", country: "New Zealand", coords: [168.6626, -45.0312] }
    ],
    prefixes: ["Alpine", "Cedar", "Snowline", "Highland", "Timberline", "Mistwood", "Cloudtop", "Summit", "Pinecone", "Glacier"],
    suffixes: ["Cabin", "Chalet", "Sanctuary", "A-frame", "Refuge", "Lodge", "Hideaway", "Loft", "Outpost", "Lookout"]
  },

  "Beaches": {
    imagePool: [
      "photo-1499793983690-e29da59ef1c2",
      "photo-1507525428034-b723cf961d3e",
      "photo-1533105079780-92b9be482077",
      "photo-1537996194471-e657df975ab4",
      "photo-1510414842594-a61c69b5ae57",
      "photo-1506929562872-bb421503ef21"
    ],
    locations: [
      { loc: "Goa", country: "India", coords: [73.8180, 15.2993] },
      { loc: "Varkala", country: "India", coords: [76.7164, 8.7379] },
      { loc: "Gokarna", country: "India", coords: [74.3188, 14.5479] },
      { loc: "Havelock Island", country: "India", coords: [93.0031, 11.9761] },
      { loc: "Santorini", country: "Greece", coords: [25.4615, 36.3932] },
      { loc: "Positano", country: "Italy", coords: [14.4850, 40.6281] },
      { loc: "Canggu", country: "Indonesia", coords: [115.1385, -8.6478] },
      { loc: "Tulum", country: "Mexico", coords: [-87.4654, 20.2114] },
      { loc: "Mallorca", country: "Spain", coords: [2.6502, 39.5696] },
      { loc: "Maui", country: "USA", coords: [-156.3319, 20.7984] }
    ],
    prefixes: ["Saltwater", "Seaside", "Driftwood", "Coastal", "Oceanfront", "Wavecrest", "Tidepool", "Shellbank", "Coral", "Sunwash"],
    suffixes: ["Cottage", "Villa", "Bungalow", "House", "Haven", "Retreat", "Shack", "Glasshouse", "Cove", "Terrace"]
  },

  "Castles": {
    imagePool: [
      "photo-1599661046827-dacff0c0f09a",
      "photo-1518780664697-55e3ad937233",
      "photo-1585543805890-6051f7829f98",
      "photo-1544644181-1484b3fdfc62",
      "photo-1533158307587-828f0a76ef46"
    ],
    locations: [
      { loc: "Udaipur", country: "India", coords: [73.7125, 24.5854] },
      { loc: "Jaipur", country: "India", coords: [75.7873, 26.9124] },
      { loc: "Jodhpur", country: "India", coords: [73.0243, 26.2389] },
      { loc: "Gwalior", country: "India", coords: [78.1828, 26.2183] },
      { loc: "Edinburgh", country: "Scotland", coords: [-3.1883, 55.9533] },
      { loc: "Highlands", country: "Scotland", coords: [-4.2026, 57.3229] },
      { loc: "Loire Valley", country: "France", coords: [0.6848, 47.3499] },
      { loc: "Bavaria", country: "Germany", coords: [11.5820, 48.1351] },
      { loc: "Sintra", country: "Portugal", coords: [-9.3817, 38.8029] },
      { loc: "Tuscany", country: "Italy", coords: [11.2558, 43.7696] }
    ],
    prefixes: ["Royal", "Stone Keep", "Heritage", "Fortress", "Bastion", "Courtyard", "Grand Duke", "Medieval", "Baronial", "Citadel"],
    suffixes: ["Palace Wing", "Castle Keep", "Haveli Suite", "Fortress Suite", "Château Chamber", "Tower Loft", "Manor", "Estate", "Alcove", "Quarters"]
  },

  "Amazing pools": {
    imagePool: [
      "photo-1571896349842-33c89424de2d",
      "photo-1582719478250-c89cae4dc85b",
      "photo-1566073771259-6a8506099945",
      "photo-1540541338287-41700207dee6",
      "photo-1576013551627-0cc20b96c2a7"
    ],
    locations: [
      { loc: "Wayanad", country: "India", coords: [76.1320, 11.6854] },
      { loc: "Goa", country: "India", coords: [73.8180, 15.2993] },
      { loc: "Ubud", country: "Indonesia", coords: [115.2625, -8.5069] },
      { loc: "Koh Samui", country: "Thailand", coords: [99.9929, 9.5120] },
      { loc: "Mykonos", country: "Greece", coords: [25.3289, 37.4467] },
      { loc: "Palm Springs", country: "USA", coords: [-116.5453, 33.8303] },
      { loc: "Ibiza", country: "Spain", coords: [1.4320, 38.9067] },
      { loc: "Riviera Maya", country: "Mexico", coords: [-87.0739, 20.6296] },
      { loc: "Langkawi", country: "Malaysia", coords: [99.7431, 6.3500] },
      { loc: "Amalfi", country: "Italy", coords: [14.6027, 40.6340] }
    ],
    prefixes: ["Infinity", "Lagoon", "Azure", "Waterfront", "Sunken", "Canopy", "Oasis", "Mirage", "Reflecting", "Springfed"],
    suffixes: ["Pool Villa", "Waterfront House", "Plunge Pavilion", "Lap Pool Loft", "Estate", "Retreat", "Veranda", "Sanctuary", "Terrace Suite", "Hideaway"]
  },

  "Domes": {
    imagePool: [
      "photo-1500530855697-b586d89ba3ee",
      "photo-1449158743715-0a90ebb6d2d8",
      "photo-1509316975850-ff9c5deb0cd9",
      "photo-1473496169904-658ba7c44d8a"
    ],
    locations: [
      { loc: "Jaisalmer", country: "India", coords: [70.9083, 26.9157] },
      { loc: "Coorg", country: "India", coords: [75.7382, 12.3375] },
      { loc: "Spiti Valley", country: "India", coords: [78.0067, 32.2461] },
      { loc: "Wadi Rum", country: "Jordan", coords: [35.4344, 29.5735] },
      { loc: "Atacama", country: "Chile", coords: [-68.2000, -22.9087] },
      { loc: "Sedona", country: "USA", coords: [-111.7610, 34.8697] },
      { loc: "Joshua Tree", country: "USA", coords: [-116.3131, 34.1347] },
      { loc: "Cappadocia", country: "Turkey", coords: [34.8289, 38.6431] },
      { loc: "Sahara Dunes", country: "Morocco", coords: [-5.6322, 30.6865] },
      { loc: "Moab", country: "USA", coords: [-109.5498, 38.5733] }
    ],
    prefixes: ["Starlit", "Geodesic", "Celestial", "Orbital", "Solarium", "Panorama", "Constellation", "Horizon", "Sunburst", "Moonrise"],
    suffixes: ["Dome", "Sphere", "Pod", "Observatory", "Bubble Suite", "Oasis", "Glamping Dome", "Skylight Suite", "Haven", "Canopy"]
  },

  "Camping": {
    imagePool: [
      "photo-1500534314209-a25ddb2bd429",
      "photo-1530789253388-582c481c54b0",
      "photo-1470246973918-29a93221c455",
      "photo-1510312305653-8ed496efae75"
    ],
    locations: [
      { loc: "Spiti", country: "India", coords: [78.0067, 32.2461] },
      { loc: "Rishikesh", country: "India", coords: [78.2676, 30.0869] },
      { loc: "Pangong Tso", country: "India", coords: [78.7500, 33.7500] },
      { loc: "Pawna Lake", country: "India", coords: [73.5042, 18.6876] },
      { loc: "Yosemite", country: "USA", coords: [-119.5383, 37.8651] },
      { loc: "Lake District", country: "UK", coords: [-3.0886, 54.4609] },
      { loc: "Patagonia", country: "Chile", coords: [-72.8814, -51.2532] },
      { loc: "Lofoten", country: "Norway", coords: [13.6074, 68.2093] },
      { loc: "Tasmania", country: "Australia", coords: [146.8087, -42.0409] },
      { loc: "Jasper", country: "Canada", coords: [-118.0814, 52.8737] }
    ],
    prefixes: ["Wilderness", "Campfire", "Riverside", "Stargazer", "Timberland", "Nomad", "Outback", "Ridgepath", "Camp", "Hinterland"],
    suffixes: ["Safari Tent", "Bell Tent", "Canvas Camp", "Yurt", "Bivouac", "Shelter", "Basecamp", "Outpost", "Field Camp", "Cabin Tent"]
  },

  "Farms": {
    imagePool: [
      "photo-1500076656116-558758c991c1",
      "photo-1506377247377-2a5b3b417ebb",
      "photo-1548013146-72479768bada",
      "photo-1520250497591-112f2f40a3f4"
    ],
    locations: [
      { loc: "Coorg", country: "India", coords: [75.7382, 12.3375] },
      { loc: "Nashik", country: "India", coords: [73.7898, 19.9975] },
      { loc: "Coonoor", country: "India", coords: [76.7959, 11.3530] },
      { loc: "Panchgani", country: "India", coords: [73.8010, 17.9237] },
      { loc: "Tuscany", country: "Italy", coords: [11.2558, 43.7696] },
      { loc: "Provence", country: "France", coords: [5.3698, 43.9352] },
      { loc: "Bordeaux", country: "France", coords: [-0.5792, 44.8378] },
      { loc: "Cotswolds", country: "UK", coords: [-1.8839, 51.8330] },
      { loc: "Barossa Valley", country: "Australia", coords: [138.9950, -34.5333] },
      { loc: "Sonoma", country: "USA", coords: [-122.4580, 38.2919] }
    ],
    prefixes: ["Orchard", "Olive Grove", "Harvest", "Meadow", "Cider", "Barnhouse", "Homestead", "Pastoral", "Greenwood", "Hayloft"],
    suffixes: ["Farmhouse", "Cottage", "Barn Studio", "Estate", "Granary", "Plantation House", "Dairy Loft", "Ranch", "Pasture Home", "Lodge"]
  },

  "Arctic": {
    imagePool: [
      "photo-1483347756197-71ef80e95f73",
      "photo-1500534623283-312aade485b7",
      "photo-1517411032315-54ef2cb783bb",
      "photo-1483921020237-2ff51e8e4b22"
    ],
    locations: [
      { loc: "Tromsø", country: "Norway", coords: [18.9553, 69.6492] },
      { loc: "Reykjavík", country: "Iceland", coords: [-21.9426, 64.1466] },
      { loc: "Rovaniemi", country: "Finland", coords: [25.7294, 66.5039] },
      { loc: "Abisko", country: "Sweden", coords: [18.8312, 68.3495] },
      { loc: "Svalbard", country: "Norway", coords: [15.6353, 78.2232] },
      { loc: "Akureyri", country: "Iceland", coords: [-18.1059, 65.6835] },
      { loc: "Ilulissat", country: "Greenland", coords: [-51.0986, 69.2198] },
      { loc: "Fairbanks", country: "USA", coords: [-147.7164, 64.8378] },
      { loc: "Whitehorse", country: "Canada", coords: [-135.0568, 60.7212] },
      { loc: "Luleå", country: "Sweden", coords: [22.1547, 65.5848] }
    ],
    prefixes: ["Aurora", "Glacial", "Polar", "Frostbound", "Nordic", "Tundra", "Boreal", "Sub-Zero", "Fjord", "Icefield"],
    suffixes: ["Glass Cabin", "Fjord Lodge", "Igloo Loft", "Timber Outpost", "Aurora Pod", "Shoreline Retreat", "Haven", "Snowhouse", "Watchtower", "Shelter"]
  },

  "Boats": {
    imagePool: [
      "photo-1500534314209-a25ddb2bd429",
      "photo-1510414842594-a61c69b5ae57",
      "photo-1544551763-46a013bb70d5",
      "photo-1498503182468-3b51cbb6cb24"
    ],
    locations: [
      { loc: "Alappuzha", country: "India", coords: [76.3388, 9.4981] },
      { loc: "Kumarakom", country: "India", coords: [76.4300, 9.6176] },
      { loc: "Srinagar", country: "India", coords: [74.7973, 34.0837] },
      { loc: "Paros", country: "Greece", coords: [25.1500, 37.0850] },
      { loc: "Amsterdam", country: "Netherlands", coords: [4.9041, 52.3676] },
      { loc: "Ha Long Bay", country: "Vietnam", coords: [107.0843, 20.9101] },
      { loc: "Dubrovnik", country: "Croatia", coords: [18.0944, 42.6507] },
      { loc: "Stockholm", country: "Sweden", coords: [18.0686, 59.3293] },
      { loc: "Lake Como", country: "Italy", coords: [9.2572, 45.9934] },
      { loc: "Seattle", country: "USA", coords: [-122.3321, 47.6062] }
    ],
    prefixes: ["Backwater", "Harbor", "Floating", "Sailor's", "Canalside", "Moored", "Nautical", "Drift", "Tidebound", "Watercraft"],
    suffixes: ["Houseboat", "Kettuvallam", "Sailing Yacht", "Barge Suite", "Catamaran Cabin", "Float House", "Harbor Loft", "Cutter", "Waterfront Berth", "Vessel"]
  },

  "Treehouses": {
    imagePool: [
      "photo-1520250497591-112f2f40a3f4",
      "photo-1448375240586-882707db888b",
      "photo-1510798831971-661eb04b3739",
      "photo-1542718610-a1d656d1884c"
    ],
    locations: [
      { loc: "Wayanad", country: "India", coords: [76.1320, 11.6854] },
      { loc: "Athirappilly", country: "India", coords: [76.5290, 10.2985] },
      { loc: "Jibhi", country: "India", coords: [77.3480, 31.6360] },
      { loc: "Thekkady", country: "India", coords: [77.1667, 9.6000] },
      { loc: "Monteverde", country: "Costa Rica", coords: [-84.8255, 10.3060] },
      { loc: "Chiang Mai", country: "Thailand", coords: [98.9853, 18.7883] },
      { loc: "Blue Mountains", country: "Australia", coords: [150.3114, -33.7150] },
      { loc: "Washington", country: "USA", coords: [-120.7401, 47.7511] },
      { loc: "Black Forest", country: "Germany", coords: [8.2267, 48.3300] },
      { loc: "Vancouver Island", country: "Canada", coords: [-125.4494, 49.6506] }
    ],
    prefixes: ["Canopy", "Bramble", "Skyhigh", "Woodland", "Perched", "Cedar branch", "Mossy", "Highbough", "Treetop", "Arbor"],
    suffixes: ["Treehouse", "Nest", "Canopy Loft", "Perch", "Forest Room", "Bough Hideaway", "Timber Roost", "Observatory", "Haven", "Tree Sanctuary"]
  },

  "Desert": {
    imagePool: [
      "photo-1500530855697-b586d89ba3ee",
      "photo-1509316975850-ff9c5deb0cd9",
      "photo-1473496169904-658ba7c44d8a",
      "photo-1470770841072-f978cf4d019e"
    ],
    locations: [
      { loc: "Jaisalmer", country: "India", coords: [70.9083, 26.9157] },
      { loc: "Pushkar", country: "India", coords: [74.5511, 26.4899] },
      { loc: "Khuri", country: "India", coords: [70.7167, 26.6167] },
      { loc: "Bikaner", country: "India", coords: [73.3119, 28.0229] },
      { loc: "Wadi Rum", country: "Jordan", coords: [35.4344, 29.5735] },
      { loc: "Marrakech", country: "Morocco", coords: [-7.9811, 31.6295] },
      { loc: "Dubai Desert", country: "UAE", coords: [55.2708, 25.2048] },
      { loc: "Joshua Tree", country: "USA", coords: [-116.3131, 34.1347] },
      { loc: "Namib", country: "Namibia", coords: [15.3222, -24.7500] },
      { loc: "Atacama", country: "Chile", coords: [-68.2000, -22.9087] }
    ],
    prefixes: ["Sandstone", "Dune", "Mirage", "Sirocco", "Golden Sun", "Amber Sands", "Oasis", "Desert Bloom", "Caravan", "Bedouin"],
    suffixes: ["Adobe Lodge", "Camp", "Oasis Villa", "Desert Retreat", "Hacienda", "Dune Kasbah", "Riad", "Solitude", "Hideaway", "Pavilion"]
  },

  "Lakefront": {
    imagePool: [
      "photo-1449158743715-0a90ebb6d2d8",
      "photo-1506744038136-46273834b3fb",
      "photo-1498503182468-3b51cbb6cb24",
      "photo-1587061949409-02df41d5e562"
    ],
    locations: [
      { loc: "Nainital", country: "India", coords: [79.4598, 29.3919] },
      { loc: "Udaipur", country: "India", coords: [73.7125, 24.5854] },
      { loc: "Bhimtal", country: "India", coords: [79.5539, 29.3499] },
      { loc: "Dal Lake", country: "India", coords: [74.8694, 34.1167] },
      { loc: "Lake Como", country: "Italy", coords: [9.2572, 45.9934] },
      { loc: "Lake Bled", country: "Slovenia", coords: [14.0938, 46.3683] },
      { loc: "Lake Tahoe", country: "USA", coords: [-120.0324, 39.0968] },
      { loc: "Lake Geneva", country: "Switzerland", coords: [6.6323, 46.5197] },
      { loc: "Lake Wanaka", country: "New Zealand", coords: [169.1321, -44.6943] },
      { loc: "Lake Garda", country: "Italy", coords: [10.6352, 45.6049] }
    ],
    prefixes: ["Stillwater", "Shoreline", "Mirror Lake", "Lakeside", "Reflecting", "Pierhead", "Mistwater", "Water's Edge", "Canoe", "Heron"],
    suffixes: ["Boathouse", "Cottage", "Lodge", "Cabin", "Villa", "Bungalow", "Pier Suite", "Hideaway", "Sanctuary", "Retreat"]
  },

  "Heritage": {
    imagePool: [
      "photo-1599661046827-dacff0c0f09a",
      "photo-1477587458883-47145ed94245",
      "photo-1528114039593-4366cc08227d",
      "photo-1529253355930-ddbe423a2ac7"
    ],
    locations: [
      { loc: "Pondicherry", country: "India", coords: [79.8083, 11.9416] },
      { loc: "Chettinad", country: "India", coords: [78.7844, 10.1697] },
      { loc: "Fort Kochi", country: "India", coords: [76.2415, 9.9658] },
      { loc: "Jaipur", country: "India", coords: [75.7873, 26.9124] },
      { loc: "Kyoto", country: "Japan", coords: [135.7681, 35.0116] },
      { loc: "Florence", country: "Italy", coords: [11.2558, 43.7696] },
      { loc: "Oaxaca", country: "Mexico", coords: [-96.7266, 17.0732] },
      { loc: "Cartagena", country: "Colombia", coords: [-75.5144, 10.3910] },
      { loc: "Hoi An", country: "Vietnam", coords: [108.3380, 15.8801] },
      { loc: "Fez", country: "Morocco", coords: [-5.0003, 34.0181] }
    ],
    prefixes: ["Ancestral", "Courtyard", "Archway", "Colonial", "Handcrafted", "Time-Honored", "Patio", "Veranda", "Fresco", "Mosaic"],
    suffixes: ["Mansion", "Haveli", "Machiya", "Riad", "Palazzo", "Villa", "Homestead", "Heritage Home", "Manor", "Quarters"]
  },

  "Luxury Villas": {
    imagePool: [
      "photo-1582719478250-c89cae4dc85b",
      "photo-1571896349842-33c89424de2d",
      "photo-1566073771259-6a8506099945",
      "photo-1540541338287-41700207dee6"
    ],
    locations: [
      { loc: "Goa", country: "India", coords: [73.8180, 15.2993] },
      { loc: "Alibaug", country: "India", coords: [72.8722, 18.6414] },
      { loc: "Udaipur", country: "India", coords: [73.7125, 24.5854] },
      { loc: "Seminyak", country: "Indonesia", coords: [115.1585, -8.6913] },
      { loc: "Santorini", country: "Greece", coords: [25.4615, 36.3932] },
      { loc: "Capri", country: "Italy", coords: [14.2426, 40.5507] },
      { loc: "Phuket", country: "Thailand", coords: [98.3923, 7.8804] },
      { loc: "St. Barts", country: "France", coords: [-62.8333, 17.9000] },
      { loc: "Cabo San Lucas", country: "Mexico", coords: [-109.9167, 22.8905] },
      { loc: "Monaco", country: "Monaco", coords: [7.4246, 43.7384] }
    ],
    prefixes: ["Opulent", "Glasshouse", "Private Estate", "Grand Horizon", "Cliffside", "Panorama", "Sanctum", "Crown", "Verdant", "Sculptural"],
    suffixes: ["Villa", "Mansion", "Estate", "Compound", "Palazzo", "Resort Villa", "Penthouse", "Sanctuary", "Manor", "Haven"]
  },

  "Tropical": {
    imagePool: [
      "photo-1537996194471-e657df975ab4",
      "photo-1506929562872-bb421503ef21",
      "photo-1510414842594-a61c69b5ae57",
      "photo-1520250497591-112f2f40a3f4"
    ],
    locations: [
      { loc: "Andaman Islands", country: "India", coords: [92.7265, 11.6234] },
      { loc: "Kovalam", country: "India", coords: [76.9806, 8.4004] },
      { loc: "Bali", country: "Indonesia", coords: [115.1889, -8.4095] },
      { loc: "Bora Bora", country: "French Polynesia", coords: [-151.7415, -16.5004] },
      { loc: "Costa Rica", country: "Costa Rica", coords: [-83.7534, 9.7489] },
      { loc: "Fiji", country: "Fiji", coords: [178.0650, -17.7134] },
      { loc: "Phuket", country: "Thailand", coords: [98.3923, 7.8804] },
      { loc: "Seychelles", country: "Seychelles", coords: [55.4920, -4.6796] },
      { loc: "Mauritius", country: "Mauritius", coords: [57.5522, -20.3484] },
      { loc: "Sri Lanka", country: "Sri Lanka", coords: [80.7718, 7.8731] }
    ],
    prefixes: ["Palm Grove", "Breeze", "Coconut", "Lagoon", "Rainforest", "Verdant", "Coral Isle", "Hibiscus", "Monsoon", "Bamboo"],
    suffixes: ["Bungalow", "Cabana", "Villa", "Hideaway", "Sanctuary", "Cottage", "Beachfront House", "Eco Lodge", "Pavilion", "Hut"]
  },

  "Iconic cities": {
    imagePool: [
      "photo-1493976040374-85c8e12f0c0e",
      "photo-1529253355930-ddbe423a2ac7",
      "photo-1534351590666-13e3e96b5017",
      "photo-1505693416388-ac5ce068fe85"
    ],
    locations: [
      { loc: "Mumbai", country: "India", coords: [72.8777, 19.0760] },
      { loc: "Delhi", country: "India", coords: [77.1025, 28.7041] },
      { loc: "Kolkata", country: "India", coords: [88.3639, 22.5726] },
      { loc: "Kyoto", country: "Japan", coords: [135.7681, 35.0116] },
      { loc: "Tokyo", country: "Japan", coords: [139.6917, 35.6895] },
      { loc: "Paris", country: "France", coords: [2.3522, 48.8566] },
      { loc: "London", country: "UK", coords: [-0.1278, 51.5074] },
      { loc: "New York", country: "USA", coords: [-74.0060, 40.7128] },
      { loc: "Barcelona", country: "Spain", coords: [2.1734, 41.3851] },
      { loc: "Rome", country: "Italy", coords: [12.4964, 41.9028] }
    ],
    prefixes: ["Metropolitan", "Old Quarter", "Rooftop", "Skyline", "Boulevard", "Atelier", "Brownstone", "Townhouse", "Pied-à-Terre", "Artist's"],
    suffixes: ["Loft", "Apartment", "Studio", "Residence", "Penthouse", "Flat", "Atelier", "Townhome", "Suite", "Refuge"]
  },

  "Rooms": {
    imagePool: [
      "photo-1470770841072-f978cf4d019e",
      "photo-1548013146-72479768bada",
      "photo-1528114039593-4366cc08227d",
      "photo-1510798831971-661eb04b3739"
    ],
    locations: [
      { loc: "Munnar", country: "India", coords: [77.0595, 10.0889] },
      { loc: "Pondicherry", country: "India", coords: [79.8083, 11.9416] },
      { loc: "Pushkar", country: "India", coords: [74.5511, 26.4899] },
      { loc: "Shillong", country: "India", coords: [91.8933, 25.5788] },
      { loc: "Florence", country: "Italy", coords: [11.2558, 43.7696] },
      { loc: "Kyoto", country: "Japan", coords: [135.7681, 35.0116] },
      { loc: "Prague", country: "Czechia", coords: [14.4378, 50.0755] },
      { loc: "Vienna", country: "Austria", coords: [16.3738, 48.2082] },
      { loc: "Dublin", country: "Ireland", coords: [-6.2603, 53.3498] },
      { loc: "Porto", country: "Portugal", coords: [-8.6291, 41.1579] }
    ],
    prefixes: ["Sunlit", "Quiet Corner", "Cozy Hearth", "Attic", "Garden", "Library", "Booklover's", "Wanderer's", "Morning Light", "Courtyard"],
    suffixes: ["Suite", "Chamber", "Studio", "Alcove", "Room", "Parlor", "Mezzanine", "Hideout", "Nook", "Den"]
  },

  "Trending": {
    imagePool: [
      "photo-1518022525094-218670c9b745",
      "photo-1499793983690-e29da59ef1c2",
      "photo-1587061949409-02df41d5e562",
      "photo-1571896349842-33c89424de2d",
      "photo-1599661046827-dacff0c0f09a"
    ],
    locations: [
      { loc: "Kodaikanal", country: "India", coords: [77.4892, 10.2381] },
      { loc: "Jaipur", country: "India", coords: [75.7873, 26.9124] },
      { loc: "Varkala", country: "India", coords: [76.7164, 8.7379] },
      { loc: "Manali", country: "India", coords: [77.1892, 32.2432] },
      { loc: "Santorini", country: "Greece", coords: [25.4615, 36.3932] },
      { loc: "Tuscany", country: "Italy", coords: [11.2558, 43.7696] },
      { loc: "Bali", country: "Indonesia", coords: [115.1889, -8.4095] },
      { loc: "Kyoto", country: "Japan", coords: [135.7681, 35.0116] },
      { loc: "Zanskar", country: "India", coords: [76.9806, 33.4862] },
      { loc: "Queenstown", country: "New Zealand", coords: [168.6626, -45.0312] }
    ],
    prefixes: ["Curated", "Slow Travel", "Artisan", "Earthy", "Handcrafted", "Bespoke", "Soulful", "Bohemian", "Timeless", "Iconic"],
    suffixes: ["Hideaway", "Haven", "Sanctuary", "Retreat", "Residence", "Loft", "Living Space", "Estate", "Cottage", "Villa"]
  }
};

const DESCRIPTIONS = [
  "A quiet timber hideaway for slow mornings and fresh mountain air.",
  "An unhurried coastal stay with the ocean close enough to hear.",
  "A private, open-sky escape designed around starry nights.",
  "A warm, deeply restful retreat at the water’s edge with panoramic glass doors.",
  "Hand-carved details, serene courtyards, and centuries of history to absorb.",
  "Spend long afternoons between lush wild forest and sparkling water.",
  "Curated linen, natural light, and bespoke architectural woodwork throughout.",
  "A meditative haven tucked away from tourist thoroughfares for total restoration.",
  "Wake up to birdsong, local roasted coffee, and crisp breezes.",
  "Minimalist aesthetics blended with warm vintage furnishings for deep comfort."
];

function generateListings() {
  const allListings = [];
  let counter = 1;

  for (const [category, data] of Object.entries(CATEGORIES_DATA)) {
    // Generate exactly 50 stays for this category!
    for (let i = 0; i < 50; i++) {
      const locObj = data.locations[i % data.locations.length];
      const prefix = data.prefixes[i % data.prefixes.length];
      const suffix = data.suffixes[Math.floor(i / data.prefixes.length) % data.suffixes.length];
      const imgId = data.imagePool[i % data.imagePool.length];
      const desc = DESCRIPTIONS[i % DESCRIPTIONS.length];

      const price = Math.round((4500 + (i * 370) % 24000) / 100) * 100;
      const title = `${prefix} ${suffix} in ${locObj.loc}`;
      const id = `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${counter}`;

      // Stagger slightly coordinates for unique pins
      const lng = Number((locObj.coords[0] + ((i % 5) - 2) * 0.02).toFixed(4));
      const lat = Number((locObj.coords[1] + ((Math.floor(i / 5) % 5) - 2) * 0.02).toFixed(4));

      allListings.push({
        id,
        title,
        description: desc,
        location: locObj.loc,
        country: locObj.country,
        price,
        category,
        image: {
          url: `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=1200&q=85`,
          filename: `stay-${counter}`
        },
        geometry: {
          type: "Point",
          coordinates: [lng, lat]
        }
      });

      counter++;
    }
  }

  return allListings;
}

const listings = generateListings();
const allCategories = [
  "All",
  "Trending",
  "Mountains",
  "Beaches",
  "Rooms",
  "Castles",
  "Amazing pools",
  "Camping",
  "Farms",
  "Arctic",
  "Domes",
  "Boats",
  "Treehouses",
  "Desert",
  "Lakefront",
  "Heritage",
  "Luxury Villas",
  "Tropical",
  "Iconic cities"
];

console.log(`Generated ${listings.length} listings across ${Object.keys(CATEGORIES_DATA).length} categories!`);

// Save to frontend and backend data files
const frontendPath = path.join(__dirname, "../frontend/lib/listings-data.json");
const backendPath = path.join(__dirname, "../backend/data/listings-data.json");

fs.mkdirSync(path.dirname(frontendPath), { recursive: true });
fs.mkdirSync(path.dirname(backendPath), { recursive: true });

fs.writeFileSync(frontendPath, JSON.stringify({ categories: allCategories, listings }, null, 2));
fs.writeFileSync(backendPath, JSON.stringify({ categories: allCategories, listings }, null, 2));

console.log(`Saved listings to:\n  -> ${frontendPath}\n  -> ${backendPath}`);
