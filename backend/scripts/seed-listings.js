require("dotenv").config();

const crypto = require("crypto");
const mongoose = require("mongoose");
const Listing = require("../models/listing.model");
const User = require("../models/users.model");

const stays = [
  ["Trending", "Saffron courtyard house", "Jaipur", "India", 10400, "An old city home with sunlit arches, handmade tiles, and slow breakfasts.", "photo-1477587458883-47145ed94245"],
  ["Trending", "Cliffside coastal retreat", "Varkala", "India", 12100, "A serene stay above the sea, made for sea-breeze evenings.", "photo-1499793983690-e29da59ef1c2"],
  ["Rooms", "Tea garden studio", "Munnar", "India", 7600, "A quiet studio surrounded by rolling tea fields and morning mist.", "photo-1548013146-72479768bada"],
  ["Rooms", "Sunlit heritage suite", "Pondicherry", "India", 6900, "Soft linen, French-colonial details, and the promenade a short walk away.", "photo-1601918774946-25832a4be0d6"],
  ["Iconic cities", "Art-filled apartment in Kala Ghoda", "Mumbai", "India", 14500, "A bright city refuge with books, records, and a view over old Mumbai.", "photo-1529253355930-ddbe423a2ac7"],
  ["Iconic cities", "Canal-side townhouse", "Amsterdam", "Netherlands", 18600, "A historic home where every window opens to the water.", "photo-1534351590666-13e3e96b5017"],
  ["Mountains", "Cedar cottage above the valley", "Mukteshwar", "India", 8900, "A fire-warmed cottage with Himalayan views at first light.", "photo-1510798831971-661eb04b3739"],
  ["Mountains", "Stone house in the Himalayas", "Tirthan Valley", "India", 7200, "River sounds, apple trees, and an unhurried mountain rhythm.", "photo-1500530855697-b586d89ba3ee"],
  ["Castles", "Restored palace wing", "Udaipur", "India", 18800, "A private room in a lakeside palace with hand-painted ceilings.", "photo-1599661046827-dacff0c0f09a"],
  ["Castles", "Highland castle keep", "Inverness", "Scotland", 24300, "A dramatic stone stay surrounded by moorland and mist.", "photo-1518780664697-55e3ad937233"],
  ["Amazing pools", "Jungle pool villa", "Wayanad", "India", 13200, "A shaded villa with a pool tucked into the forest canopy.", "photo-1571896349842-33c89424de2d"],
  ["Amazing pools", "Palm-framed pool house", "Goa", "India", 11600, "An airy, low-key hideaway made for long afternoons outside.", "photo-1566073771259-6a8506099945"],
  ["Camping", "Canvas camp beneath the stars", "Spiti", "India", 5100, "A thoughtfully simple camp where the night sky takes over.", "photo-1500534314209-a25ddb2bd429"],
  ["Camping", "Lakeside safari tent", "Bhopal", "India", 6400, "Comfortable canvas, birdsong, and a shoreline at your doorstep.", "photo-1530789253388-582c481c54b0"],
  ["Farms", "Olive grove farmhouse", "Nashik", "India", 8300, "Stone walls, long dinners, and slow walks between olive trees.", "photo-1500076656116-558758c991c1"],
  ["Farms", "Vineyard cottage", "Bordeaux", "France", 15900, "A thoughtful country stay surrounded by vines and open skies.", "photo-1506377247377-2a5b3b417ebb"],
  ["Arctic", "Glass cabin under the aurora", "Tromsø", "Norway", 27500, "A warm little cabin designed around the northern sky.", "photo-1483347756197-71ef80e95f73"],
  ["Arctic", "Nordic shoreline lodge", "Reykjavík", "Iceland", 22100, "Dark timber, geothermal warmth, and a horizon full of weather.", "photo-1500534623283-312aade485b7"],
  ["Domes", "Desert stargazing dome", "Jaisalmer", "India", 7100, "A private dome for watching the desert change from gold to ink.", "photo-1500530855697-b586d89ba3ee"],
  ["Domes", "Forest geodesic retreat", "Coorg", "India", 9800, "A round, quiet room in the trees with a sky-facing bed.", "photo-1449158743715-0a90ebb6d2d8"],
  ["Boats", "Houseboat on the backwaters", "Alappuzha", "India", 10900, "A floating stay with coconut palms passing gently by.", "photo-1510414842594-a61c69b5ae57"],
  ["Boats", "Sailing cabin in the Cyclades", "Paros", "Greece", 17800, "Wake up to a new blue horizon and breakfast on the deck.", "photo-1500534314209-a25ddb2bd429"],
  ["Trending", "Earth home in the hills", "Kodaikanal", "India", 8100, "A low-impact retreat of local stone, timber, and quiet.", "photo-1520637836862-4d197d17c55a"],
  ["Rooms", "Desert adobe guesthouse", "Pushkar", "India", 5300, "Textured plaster, woven rugs, and a peaceful courtyard.", "photo-1470770841072-f978cf4d019e"],
  ["Iconic cities", "Rooftop atelier", "Lisbon", "Portugal", 14200, "A creative hideout above tiled streets and late-night cafés.", "photo-1505693416388-ac5ce068fe85"],
  ["Mountains", "Snowline cabin", "Gulmarg", "India", 9700, "A timber cabin just below the treeline, made for winter.", "photo-1518022525094-218670c9b745"],
  ["Farms", "Orchard cottage", "Coonoor", "India", 7400, "Wake to birds, fresh fruit, and a view over the Nilgiris.", "photo-1500076656116-558758c991c1"],
  ["Amazing pools", "Clifftop infinity stay", "Koh Samui", "Thailand", 19800, "A calm, sculptural stay that opens out towards the sea.", "photo-1582719478250-c89cae4dc85b"],
];

async function seed() {
  if (!process.env.ATLASDB_URL) throw new Error("ATLASDB_URL is missing in backend/.env");
  await mongoose.connect(process.env.ATLASDB_URL);
  let owner = await User.findOne({ username: "wanderlust-curator" });
  if (!owner) {
    owner = await User.register(
      new User({ username: "wanderlust-curator", email: "curator@wanderlust.local" }),
      crypto.randomBytes(32).toString("hex")
    );
  }
  const operations = stays.map(([category, title, location, country, price, description, imageId], index) => ({
    updateOne: {
      filter: { title, location, country },
      update: {
        $set: {
          category, title, location, country, price, description, owner: owner._id,
          image: { url: `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=1400&q=85`, filename: `seed-${index + 1}` },
          geometry: { type: "Point", coordinates: [77 + (index % 8), 8 + (index % 10)] },
        },
      },
      upsert: true,
    },
  }));
  const result = await Listing.bulkWrite(operations);
  console.log(`Seed complete: ${stays.length} curated stays processed (${result.upsertedCount} new, ${result.modifiedCount} updated).`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
