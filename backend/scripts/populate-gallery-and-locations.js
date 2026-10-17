require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.model");

// Curated architectural photos grouped by category and room type
const CATEGORY_ROOM_POOLS = {
  Trending: {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "Sunlit Master Bedroom with Ocean Breeze" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85", caption: "Minimalist Master Suite with Linen Drapes" },
      { url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85", caption: "King Suite with Floor-to-Ceiling Windows" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Open-Plan Living Lounge & Timber Verandah" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", caption: "Sun-Drenched Living Room with Artisan Rugs" },
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85", caption: "Architectural Salon with Curved Sofa" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Stone Soaking Tub with Rainforest View" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Monolithic Marble Spa Bath & Rain Shower" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "Private Infinity Plunge Pool & Sun Deck" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", caption: "Sunset Dining Terrace by the Waves" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85", caption: "Coastal Haven Panorama & Ocean Horizon" },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85", caption: "Golden Hour Coastline & Sand Dunes" },
    ],
  },
  Mountains: {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85", caption: "Loft Bedroom with Panoramic Mountain Glaze" },
      { url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85", caption: "Pine-Framed Timber Suite with Wool Blankets" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85", caption: "Hearthside Fireplace & Reading Nook" },
      { url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85", caption: "Timber Great Room with Mountain Light" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Alpine Spa Bath with Pine Forest Skyline" },
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Cedar Soaking Tub Overlooking Ravine" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85", caption: "Cedar Balcony Overlooking Snow Peaks" },
      { url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85", caption: "A-Frame Timber Chalet & Evening Firepit" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=85", caption: "Morning Mist Rising Over Pine Valley" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85", caption: "Glacial Mountain Peaks at First Light" },
    ],
  },
  Beaches: {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "Beachfront Suite with Ocean Breezeway" },
      { url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85", caption: "Canopy King Bed Overlooking Blue Water" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", caption: "Coastal Saloon with Rattan Furniture" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Whitewashed Open-Air Living Pavilion" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Open-Air Shell Stone Shower" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Freestanding Deep Tub with Sea Views" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85", caption: "Private White Sand Shoreline & Hammock" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "Beachfront Infinity Plunge Pool" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85", caption: "Sunset Over Turquoise Coral Reef" },
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", caption: "Evening Twilight Across the Waves" },
    ],
  },
  "Amazing pools": {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "Pool-Level Master Pavilion" },
      { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85", caption: "Sun-Dappled Suite with Direct Pool Access" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", caption: "Sunken Lounge Overhanging Pool" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Glass-Walled Indoor/Outdoor Living Space" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Granite Tub with Waterfall Feature" },
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Outdoor Lagoon Shower" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85", caption: "50-Meter Infinity Pool Melting into the Horizon" },
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "Illuminated Night Plunge Pool & Floating Daybeds" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "Reflecting Waters Under Starry Sky" },
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", caption: "Azure Horizon & Palm Grove Reflection" },
    ],
  },
  Castles: {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", caption: "Royal Heritage Suite with Carved Pillars" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "Tower Chamber with Antique Brocade Drapes" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85", caption: "Courtyard Fountain with Lotus Pool" },
      { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85", caption: "Great Hearth Hall with Tapestries" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85", caption: "Marble Bath with Hand-Painted Frescoes" },
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Vaulted Stone Bathing Pavilion" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85", caption: "Grand Sandstone Palace Facade & Ramparts" },
      { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", caption: "Rooftop Jharokha Overlooking City of Lakes" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85", caption: "Ancient Citadel Ramparts at Twilight" },
    ],
  },
  Domes: {
    bedrooms: [
      { url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85", caption: "Panoramic Bed Under the Milky Way" },
      { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85", caption: "Curved Canvas Loft with Stargazing Ceiling" },
    ],
    living: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", caption: "Desert Firepit & Starlight Lounge" },
      { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", caption: "Bespoke Geometric Living Sphere" },
    ],
    bath: [
      { url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85", caption: "Open Air Copper Soaking Tub" },
    ],
    outdoor: [
      { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85", caption: "Stargazing Geodesic Dome at Twilight" },
    ],
    views: [
      { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85", caption: "Desert Sunset Over Golden Dunes" },
    ],
  },
};

// Fallback pool for any other categories
const DEFAULT_POOL = CATEGORY_ROOM_POOLS["Trending"];

// Comprehensive accurate coordinates for worldwide WanderLust destinations [longitude, latitude]
const LOCATION_COORDINATES = {
  "Jaipur": [75.7873, 26.9124],
  "Varkala": [76.7164, 8.7379],
  "Munnar": [77.0595, 10.0889],
  "Pondicherry": [79.8083, 11.9416],
  "Mumbai": [72.8777, 19.0760],
  "Amsterdam": [4.9041, 52.3676],
  "Mukteshwar": [79.6469, 29.4722],
  "Tirthan Valley": [77.3486, 31.6425],
  "Udaipur": [73.7125, 24.5854],
  "Inverness": [-4.2247, 57.4778],
  "Wayanad": [76.1320, 11.6854],
  "Goa": [73.8180, 15.2993],
  "Spiti": [78.0338, 32.2461],
  "Bhopal": [77.4126, 23.2599],
  "Nashik": [73.7898, 19.9975],
  "Bordeaux": [-0.5792, 44.8378],
  "Tromsø": [18.9553, 69.6492],
  "Reykjavík": [-21.9426, 64.1466],
  "Jaisalmer": [70.9083, 26.9157],
  "Coorg": [75.7382, 12.3375],
  "Alappuzha": [76.3388, 9.4981],
  "Paros": [25.1531, 37.0856],
  "Kodaikanal": [77.4892, 10.2381],
  "Pushkar": [74.5511, 26.4897],
  "Lisbon": [-9.1393, 38.7223],
  "Gulmarg": [74.3805, 34.0484],
  "Coonoor": [76.7959, 11.3530],
  "Koh Samui": [100.0136, 9.5120],
  "Bali": [115.1889, -8.4095],
  "Kyoto": [135.7681, 35.0116],
  "Tuscany": [11.2558, 43.7696],
  "Zanskar": [76.8773, 33.5462],
  "Queenstown": [168.6626, -45.0312],
  "Santorini": [25.4615, 36.3932],
  "Manali": [77.1892, 32.2396],
  "Rishikesh": [78.2676, 30.0869],
  "Shimla": [77.1734, 31.1048],
  "Darjeeling": [88.2663, 27.0410],
  "Ooty": [76.6932, 11.4102],
  "Paris": [2.3522, 48.8566],
  "London": [-0.1278, 51.5074],
  "New York": [-74.0060, 40.7128],
  "Tokyo": [139.6917, 35.6895],
  "Rome": [12.4964, 41.9028],
  "Barcelona": [2.1734, 41.3851],
  "Cape Town": [18.4241, -33.9249],
  "Sydney": [151.2093, -33.8688],
  "Dubai": [55.2708, 25.2048],
  "Maldives": [73.5093, 4.1755],
  "Zurich": [8.5417, 47.3769],
  "Venice": [12.3155, 45.4408],
  "Florence": [11.2558, 43.7696],
  "Agra": [78.0081, 27.1767],
  "Varanasi": [82.9739, 25.3176],
  "Hampi": [76.4600, 15.3350],
  "Leh": [77.5771, 34.1526],
  "Kasol": [77.3150, 32.0100],
  "Mussoorie": [78.0700, 30.4598],
  "Alleppey": [76.3388, 9.4981],
  "Alibaug": [72.8710, 18.6414],
  "Amalfi": [14.6027, 40.6340],
  "Andaman Islands": [92.7265, 11.6234],
  "Atacama": [-68.2000, -23.8634],
  "Athirappilly": [76.5499, 10.2980],
  "Banff": [-115.5708, 51.1784],
  "Barossa Valley": [138.9515, -34.5373],
  "Bavaria": [11.5820, 48.1351],
  "Bhimtal": [79.5539, 29.3484],
  "Bikaner": [73.3119, 28.0229],
  "Black Forest": [8.1883, 48.3000],
  "Blue Mountains": [150.3119, -33.7149],
  "Bora Bora": [-151.7415, -16.5004],
  "Cabo San Lucas": [-109.9167, 22.8905],
  "Canggu": [115.1385, -8.6478],
  "Cappadocia": [34.8289, 38.6431],
  "Capri": [14.2426, 40.5507],
  "Cartagena": [-75.5144, 10.3997],
  "Chamonix": [6.8694, 45.9237],
  "Chettinad": [78.7844, 10.1697],
  "Chiang Mai": [98.9853, 18.7883],
};

function getHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

async function migrate() {
  const uri = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";
  console.log("Connecting to:", uri);
  await mongoose.connect(uri);

  const listings = await Listing.find();
  console.log(`Found ${listings.length} listings to update...`);

  let updatedCount = 0;

  for (const listing of listings) {
    const hash = getHash(String(listing._id) + listing.title);
    const pool = CATEGORY_ROOM_POOLS[listing.category] || DEFAULT_POOL;

    // Pick 1 from each space category
    const bed = pool.bedrooms[hash % pool.bedrooms.length];
    const liv = pool.living[(hash + 1) % pool.living.length];
    const bat = pool.bath[(hash + 2) % pool.bath.length];
    const out = pool.outdoor[(hash + 3) % pool.outdoor.length];
    const vie = pool.views[(hash + 4) % pool.views.length];

    const images = [
      {
        url: listing.image?.url || bed.url,
        filename: "facade-hero",
        caption: `${listing.title} - Main Exterior`,
      },
      {
        url: bed.url,
        filename: "master-bedroom",
        caption: bed.caption,
      },
      {
        url: liv.url,
        filename: "living-lounge",
        caption: liv.caption,
      },
      {
        url: bat.url,
        filename: "spa-bath",
        caption: bat.caption,
      },
      {
        url: out.url,
        filename: "outdoor-deck",
        caption: out.caption,
      },
      {
        url: vie.url,
        filename: "scenic-views",
        caption: vie.caption,
      },
    ];

    // Coordinates update
    let coords = LOCATION_COORDINATES[listing.location];
    if (!coords) {
      // Deterministic slight offset based on hash if approximate
      const baseLng = 75 + (hash % 15);
      const baseLat = 15 + ((hash >> 4) % 18);
      coords = [Number(baseLng.toFixed(4)), Number(baseLat.toFixed(4))];
    } else {
      // Add a slight micro-jitter (100-300m) so multiple stays in same city don't completely overlap
      const jitterLng = ((hash % 100) - 50) * 0.0003;
      const jitterLat = (((hash >> 3) % 100) - 50) * 0.0003;
      coords = [Number((coords[0] + jitterLng).toFixed(5)), Number((coords[1] + jitterLat).toFixed(5))];
    }

    const geometry = {
      type: "Point",
      coordinates: coords,
    };

    await Listing.updateOne(
      { _id: listing._id },
      {
        $set: {
          images: images,
          geometry: geometry,
        },
      }
    );

    updatedCount++;
    if (updatedCount % 100 === 0) {
      console.log(`Updated ${updatedCount}/${listings.length} listings...`);
    }
  }

  console.log(`Successfully migrated all ${updatedCount} listings with multi-images and coordinates!`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
