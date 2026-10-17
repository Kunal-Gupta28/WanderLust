// Hand-curated, high-resolution photo sets matching each stay category
const CATEGORY_GALLERIES = {
  Trending: [
    {
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85",
      caption: "Coastal Haven & Oceanfront Deck",
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      caption: "Private Infinity Plunge Pool",
    },
    {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      caption: "Sunlit Master Bedroom with Ocean Breeze",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      caption: "Open-Plan Living Lounge & Timber Verandah",
    },
    {
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      caption: "Stone Soaking Tub with Rainforest View",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      caption: "Sunset Dining Terrace by the Waves",
    },
  ],
  Mountains: [
    {
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85",
      caption: "A-Frame Timber Chalet in the Pines",
    },
    {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
      caption: "Hearthside Fireplace & Reading Nook",
    },
    {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      caption: "Loft Bedroom with Panoramic Mountain Glaze",
    },
    {
      url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85",
      caption: "Cedar Balcony Overlooking Snow Peaks",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      caption: "Alpine Spa Bath with Forest Skyline",
    },
    {
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=85",
      caption: "Morning Mist Rising Over Pine Valley",
    },
  ],
  Domes: [
    {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
      caption: "Stargazing Geodesic Dome at Twilight",
    },
    {
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=85",
      caption: "Panoramic Bed Under the Milky Way",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      caption: "Desert Firepit & Starlight Lounge",
    },
    {
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      caption: "Open Air Copper Soaking Tub",
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85",
      caption: "Desert Sunset Over Golden Dunes",
    },
  ],
  Castles: [
    {
      url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85",
      caption: "Grand Sandstone Palace Facade",
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      caption: "Royal Heritage Suite with Carved Pillars",
    },
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      caption: "Courtyard Fountain with Lotus Pool",
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      caption: "Rooftop Jharokha Overlooking City of Lakes",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      caption: "Marble Bath with Hand-Painted Frescoes",
    },
  ],
  "Amazing pools": [
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
      caption: "Infinity Pool at the Edge of the Canopy",
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      caption: "Sunken Daybeds & Coconut Palms",
    },
    {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      caption: "Glass-Walled Villa Master Suite",
    },
    {
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      caption: "Outdoor Rain Shower Under Tropical Leaves",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      caption: "Floating Breakfast Deck at Dawn",
    },
  ],
  Rooms: [
    {
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=85",
      caption: "Still Water Cabin at Lake's Edge",
    },
    {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      caption: "Handmade Timber Bed with Wool Linens",
    },
    {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
      caption: "Lakeside Living Room with Brass Stove",
    },
    {
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      caption: "Morning Coffee Bench by the Water",
    },
    {
      url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=85",
      caption: "Lakeside Sunset with Wooden Canoe",
    },
  ],
};

const DEFAULT_GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
    caption: "Sanctuary Living Quarters",
  },
  {
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    caption: "Sunlit Master Bedroom",
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    caption: "Outdoor Verandah & Garden",
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    caption: "Minimalist Stone Bathroom",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    caption: "Sunset Dining Area",
  },
];

/**
 * Extracts or synthesizes a 5-6 photo gallery for any stay
 */
export function getListingGallery(listing) {
  if (!listing) return DEFAULT_GALLERY;

  const rawImages = [];

  // Check if listing has custom images array
  if (Array.isArray(listing.images) && listing.images.length > 0) {
    listing.images.forEach((img, idx) => {
      const url = typeof img === "string" ? img : img.url;
      if (url) {
        rawImages.push({
          url,
          caption: (typeof img === "object" && img.caption) || `Stay Photo ${idx + 1}`,
        });
      }
    });
  }

  // Primary cover image
  const coverUrl = listing.image?.url;
  if (coverUrl && !rawImages.some((i) => i.url === coverUrl)) {
    rawImages.unshift({
      url: coverUrl,
      caption: listing.title || "Main Sanctuary Exterior",
    });
  }

  // If we already have 5+ photos, return
  if (rawImages.length >= 5) {
    return rawImages;
  }

  // Fill in curated matching photos based on category
  const matchingSet =
    CATEGORY_GALLERIES[listing.category] ||
    CATEGORY_GALLERIES["Trending"] ||
    DEFAULT_GALLERY;

  const combined = [...rawImages];
  for (const item of matchingSet) {
    if (!combined.some((c) => c.url === item.url)) {
      combined.push(item);
    }
    if (combined.length >= 6) break;
  }

  return combined;
}
