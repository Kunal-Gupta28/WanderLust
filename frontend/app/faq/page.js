"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const faqs = [
  // General & Philosophy (8 items)
  {
    category: "General & Philosophy",
    q: "What makes WanderLust different from mainstream booking platforms?",
    a: "WanderLust is an architectural and nature-focused collection of handpicked, design-led, and environmentally conscious stays. Unlike mass aggregators with millions of generic, algorithm-driven listings, every home on WanderLust is personally reviewed against strict aesthetic benchmarks: architectural originality, generous natural light, sustainable building materials, peaceful privacy, and authentic integration into local rural and wild landscapes."
  },
  {
    category: "General & Philosophy",
    q: "What does 'Slow Travel' mean at WanderLust?",
    a: "Slow travel is an intentional philosophy where you prioritize immersion and restorative rest over frantic bucket-list ticking. Instead of rushing between multiple cities in a week, we encourage staying 3 or more nights in one sanctuary, walking local trails, cooking regional produce, reading on sunlit verandas, and giving back to neighborhood makers, bakers, and artisans."
  },
  {
    category: "General & Philosophy",
    q: "Do I need an account to browse or book a stay?",
    a: "You can freely browse all 900+ stays, search by biome or architectural style, and inspect detailed floorplans without an account. However, creating a free WanderLust account lets you curate personal wishlists, save favorite sanctuaries, message hosts directly, view booking history, and access exclusive seasonal openings."
  },
  {
    category: "General & Philosophy",
    q: "How can I try out WanderLust without registering?",
    a: "We offer a 1-Click Demo Login right on our sign-in page! You can test our interactive reservation system, explore saved stays, and navigate guest dashboards without entering personal data."
  },
  {
    category: "General & Philosophy",
    q: "Can I purchase gift cards or travel credits for friends and family?",
    a: "Yes. WanderLust Travel Vouchers are available in custom amounts ($100 to $2,500). They never expire, include a customizable digital invitation with architectural sketches, and can be applied toward any stay across our 18 global categories."
  },
  {
    category: "General & Philosophy",
    q: "How are the properties photographed and verified?",
    a: "Every photograph is captured under natural daylight by our editorial documentary team or verified professional architectural photographers. We forbid deceptive wide-angle distortion, fake render overlays, and heavy filters so your arrival matches exactly what you saw online."
  },
  {
    category: "General & Philosophy",
    q: "Does WanderLust own the properties or are they independently hosted?",
    a: "WanderLust is a curated marketplace of privately owned sanctuaries. The properties are lovingly maintained by independent architects, artists, ecological stewards, and multi-generational families who care deeply about their land and hospitality."
  },
  {
    category: "General & Philosophy",
    q: "Where is WanderLust headquartered and which regions are covered?",
    a: "Founded in Kyoto and San Francisco, WanderLust curates sanctuaries across 32 countries spanning the Scandinavian fjords, Mediterranean coasts, Japanese alpine valleys, North American forests, Patagonian lakes, and Scottish highlands."
  },

  // Booking & Reservations (8 items)
  {
    category: "Booking & Reservations",
    q: "How does the reservation request and confirmation workflow operate?",
    a: "When you select dates and click 'Request Reservation', your host receives your trip profile, party size, and message. Most hosts respond within 4 to 12 hours. Your payment method is authorized at booking but only captured once the host confirms your stay."
  },
  {
    category: "Booking & Reservations",
    q: "What is your cancellation and refund timeline?",
    a: "Hosts select one of three transparent cancellation tiers: Flexible (100% refund up to 48 hours prior to check-in), Moderate (100% refund up to 7 days prior), and Restorative (100% refund up to 14 days prior, or 50% thereafter). The exact policy is highlighted in bold before payment."
  },
  {
    category: "Booking & Reservations",
    q: "Can I extend my stay or modify dates after booking?",
    a: "Yes. In your guest dashboard or by messaging your host, you can request an extension or date adjustment. If the calendar is clear, modifications are processed with no administrative fee—only the difference in nightly room rates."
  },
  {
    category: "Booking & Reservations",
    q: "Are long-term stays, creative sabbaticals, and artist residencies supported?",
    a: "Yes! Over 60% of our properties welcome extended creative retreats. Weekly stays receive automatic 10-15% discounts, while monthly stays receive 20-35% discounts. Extended stays include scheduled mid-stay linen refreshes and optional housekeeping."
  },
  {
    category: "Booking & Reservations",
    q: "What happens if a host cancels my confirmed booking?",
    a: "Host cancellations are extraordinarily rare (under 0.2%). In the rare event this happens, our 24/7 Guest Care team immediately provides a 100% refund plus a 20% rebooking stipend, and our concierge personally secures an equal or upgraded alternative."
  },
  {
    category: "Booking & Reservations",
    q: "Can I book multiple properties simultaneously for a group or wedding?",
    a: "For family reunions, intimate architectural weddings, or team retreats requiring multiple dwellings or adjoining estates, our Group Concierge team coordinates multi-cabin bookings, caterers, and private shuttles. Contact us via our support page."
  },
  {
    category: "Booking & Reservations",
    q: "How far in advance can I book a WanderLust sanctuary?",
    a: "Most hosts open their calendars 6 to 12 months in advance. For secluded seasonal destinations like Nordic summer cabins or Japanese autumn ryokans, early booking 3 to 6 months in advance is recommended."
  },
  {
    category: "Booking & Reservations",
    q: "Is same-day or instant check-in possible?",
    a: "Selected properties equipped with automated smart-lock hardware and prepped turn-down service feature 'Instant Booking' for arrivals within 3 hours. Filter by 'Instant Book' in the explore directory."
  },

  // Stays & Amenities (8 items)
  {
    category: "Stays & Amenities",
    q: "What kitchen appliances, pantry items, and cookware are provided?",
    a: "Every home features a gourmet kitchen with cast-iron or stainless steel cookware, chef's knives, pour-over or espresso setups, and an artisan pantry starter kit: cold-pressed olive oil, flake sea salt, peppercorns, organic local coffee beans, and herbal teas."
  },
  {
    category: "Stays & Amenities",
    q: "How do self check-in, keyless smart locks, and lockboxes work?",
    a: "48 hours prior to arrival, you receive a digital Welcome Guide containing GPS coordinates, road conditions, and an encrypted keyless keypad code or lockbox combination. Codes activate precisely at check-in time and expire at checkout for total privacy."
  },
  {
    category: "Stays & Amenities",
    q: "Are linens, bath towels, and luxury toiletries included in every stay?",
    a: "Yes. Every bed is dressed in stonewashed Belgian linen or organic cotton percales. Bathrooms are stocked with organic botanical shampoos, conditioners, hand soaps, plush bath sheets, and waffle-weave bathrobes."
  },
  {
    category: "Stays & Amenities",
    q: "What kind of heating, woodfire stoves, or air conditioning can I expect?",
    a: "Depending on the climate, properties feature hydronic radiant in-floor heating, high-efficiency heat pumps, or modern wood-burning Scandinavian hearths with complimentary seasoned hardwood firewood, kindling, and matches."
  },
  {
    category: "Stays & Amenities",
    q: "Are the cedar hot tubs, thermal pools, and saunas heated year-round?",
    a: "Yes. Hot tubs and thermal soaking plunge pools are kept hot year-round (102°F–104°F). Saunas—both traditional Finnish wood-fired and infrared cedar barrel saunas—include aromatic eucalyptus oils and cold dip plunge access."
  },
  {
    category: "Stays & Amenities",
    q: "What should I do if an amenity or appliance malfunctions during my stay?",
    a: "Contact your host directly through the in-app messaging thread or the emergency contact telephone listed in your arrival dossier. All hosts maintain rapid on-call local property caretakers for quick repairs."
  },
  {
    category: "Stays & Amenities",
    q: "Can I request early check-in or late check-out?",
    a: "Early check-ins and late check-outs are accommodated whenever the cleaning schedule permits. You can request this in advance through the host chat. When possible, hosts grant up to 2 extra hours complimentary."
  },
  {
    category: "Stays & Amenities",
    q: "Are mountain and desert stays accessible by standard two-wheel-drive cars?",
    a: "Every property listing provides specific road access notes. Over 85% are reachable with standard compact vehicles on paved roads. For rugged alpine trailheads or desert sands requiring 4WD/AWD or high clearance, clear warnings are posted in the listing overview."
  },

  // Remote Work & WiFi (7 items)
  {
    category: "Remote Work & WiFi",
    q: "Are high-speed WiFi and verified internet speeds available for remote work?",
    a: "Yes. Every property tagged with 'Workation' has verified broadband or Starlink satellite internet tested at 100+ Mbps download and 25+ Mbps upload with low latency, suitable for simultaneous 4K Zoom calls and large file transfers."
  },
  {
    category: "Remote Work & WiFi",
    q: "What ergonomic workspace setups are provided in 'Workation' homes?",
    a: "Workation-ready sanctuaries provide dedicated solid-wood writing desks, ergonomic task chairs, task lighting, multiple power outlets with surge protection, and external monitor HDMI/USB-C docking stations."
  },
  {
    category: "Remote Work & WiFi",
    q: "Do you offer backup power solutions (solar, battery, generators) in off-grid stays?",
    a: "Yes. Our off-grid architectural retreats are equipped with Tesla Powerwall batteries or rooftop solar arrays backed by silent auxiliary generators, ensuring continuous power for your laptop, lights, and WiFi even in remote forest storms."
  },
  {
    category: "Remote Work & WiFi",
    q: "Can I host virtual conferences, webinars, or client presentations?",
    a: "Yes. Stays labeled with 'Quiet Workspace' guarantee low ambient noise, acoustic timber baffles, and private separate study rooms so you can present without distraction."
  },
  {
    category: "Remote Work & WiFi",
    q: "Are there quiet acoustic environments suitable for podcasters, musicians, or writers?",
    a: "Many of our forest treehouses, stone barns, and coastal observatories were designed specifically for writers, screenwriters, and recording artists. You will find complete acoustic tranquility with no adjacent traffic."
  },
  {
    category: "Remote Work & WiFi",
    q: "Can I receive Amazon, courier, or grocery deliveries during an extended retreat?",
    a: "For stays longer than one week, hosts provide secure physical delivery boxes or local village pickup points where courier parcels and farm-fresh grocery boxes can be delivered reliably."
  },
  {
    category: "Remote Work & WiFi",
    q: "Is cellular phone reception available in deep wilderness retreats?",
    a: "Cellular signal strength (4G/5G) for major carriers is explicitly rated on each stay's amenities tab (e.g., 'Strong 5G', 'Moderate 4G', or 'Zero Cellular / WiFi Calling Only')."
  },

  // Hosting & Curation (7 items)
  {
    category: "Hosting & Curation",
    q: "How does WanderLust select and curate properties?",
    a: "Our curation committee reviews applications against four pillars: Architectural Intent (design, daylight, proportions), Material Integrity (natural woods, stones, ceramics), Environmental Stewardship (energy efficiency, renewable power), and Warmth of Hospitality."
  },
  {
    category: "Hosting & Curation",
    q: "How do I apply to list my architectural home or countryside sanctuary?",
    a: "Click 'Host with Us' or reach out via our contact page. Submit photos, location coordinates, architectural backstory, and your vision for hosting. Our regional curators review every submission within 5 business days."
  },
  {
    category: "Hosting & Curation",
    q: "What commission fees does WanderLust charge hosts?",
    a: "We maintain a transparent, host-first 3% service fee—among the lowest in the boutique travel industry. This covers merchant payment processing, server architecture, automated calendar syncing, and 24/7 host concierge."
  },
  {
    category: "Hosting & Curation",
    q: "What support and resources are provided to independent hosts?",
    a: "Hosts receive tailored pricing analysis, calendar management tools, editorial features in WanderLust Journal, and direct access to dedicated host liaisons."
  },
  {
    category: "Hosting & Curation",
    q: "How do host payouts work and what currencies are supported?",
    a: "Payouts are automatically initiated 24 hours after guest check-in via direct bank transfer, Stripe, or Wise in 28 global currencies with detailed accounting statements for tax records."
  },
  {
    category: "Hosting & Curation",
    q: "Does WanderLust provide professional architectural photography for new hosts?",
    a: "Yes. Verified accepted listings are eligible for our subsidized editorial photography program, pairing your home with vetted architectural documentary photographers."
  },
  {
    category: "Hosting & Curation",
    q: "What protection is provided if a guest causes accidental property damage?",
    a: "Every verified WanderLust reservation includes our $1,000,000 Host Peace of Mind Guarantee, protecting structural damage, designer furnishings, and fine art with zero deductible."
  },

  // Payments, Refunds & Insurance (7 items)
  {
    category: "Payments, Refunds & Insurance",
    q: "Which payment methods and currencies are accepted?",
    a: "We accept Visa, MasterCard, American Express, Apple Pay, Google Pay, and European SEPA transfers. Transactions can be settled in USD, EUR, GBP, CAD, AUD, JPY, and CHF with zero foreign transaction markup."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "Are there any hidden fees, surcharges, or surprises at checkout?",
    a: "Never. We practice Total Price Transparency. The nightly rate, cleaning fee, and municipal hospitality taxes are all calculated upfront. The amount you see is the exact amount charged."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "How are security damage authorizations handled and when are they released?",
    a: "Certain luxury properties place a temporary credit card pre-authorization hold 24 hours before check-in ($250 to $1,000). The hold is automatically released within 3 business days after checkout once the turnover team verifies the space."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "Can I split the payment across multiple cards or pay in installments?",
    a: "For stays booked more than 30 days in advance totaling over $800, we offer a two-part payment schedule: 50% upon booking confirmation, and the remaining 50% automatically charged 14 days prior to arrival."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "How do I obtain a VAT or tax invoice for business expense reporting?",
    a: "Itemized tax invoices containing your company name, tax ID, and municipal occupancy tax breakdown can be downloaded with one click from your account reservation receipt."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "How quickly are refunds credited back to my account after a cancellation?",
    a: "Refunds compliant with the property's cancellation terms are issued immediately by our system and appear on your original payment card within 3 to 7 business days."
  },
  {
    category: "Payments, Refunds & Insurance",
    q: "What happens in cases of severe weather, natural disruptions, or flight cancelations?",
    a: "Under our Extenuating Circumstances Policy, events like government travel bans, forest fires, or road closures that physically block access entitle guests to a full refund or rebooking credit regardless of standard host timelines."
  },

  // Safety & Guidelines (7 items)
  {
    category: "Safety & Guidelines",
    q: "How does WanderLust verify the identity of hosts and traveling guests?",
    a: "All hosts and booking guests undergo secure identity verification involving government photo ID cross-referencing and biometrics. Reviews are strictly authentic and can only be submitted after an actual completed stay."
  },
  {
    category: "Safety & Guidelines",
    q: "What should I do if an emergency arises in the middle of the night?",
    a: "Every sanctuary includes an emergency booklet with local fire, police, and emergency clinic phone numbers, hospital routes, and your host's 24-hour phone line. WanderLust also operates a 24/7 global safety hotline."
  },
  {
    category: "Safety & Guidelines",
    q: "What are the standard community quiet hours and noise volume expectations?",
    a: "To protect wildlife and rural neighbors, all properties enforce quiet hours between 10:00 PM and 7:00 AM. Parties, commercial DJ gear, and unauthorized loud gatherings are strictly forbidden."
  },
  {
    category: "Safety & Guidelines",
    q: "Are commercial photography, film shoots, or brand campaigns permitted?",
    a: "Casual personal photography and vacation memories are welcomed! Commercial photo shoots, film productions, brand lookbooks, or monetizeable content require advance host permission and commercial location fees."
  },
  {
    category: "Safety & Guidelines",
    q: "Are surveillance cameras, indoor monitors, or smart listening devices allowed?",
    a: "Indoor cameras or listening devices are strictly prohibited across all WanderLust properties without exception. Exterior security cameras facing driveways or gates for property safety must be explicitly disclosed in the listing description."
  },
  {
    category: "Safety & Guidelines",
    q: "What are the rules regarding outdoor campfires, fire pits, and indoor hearths?",
    a: "Campfires and fire pits are only permitted in designated stone-lined circles and must follow local wildfire risk guidelines. During regional dry seasons or red-flag warnings, open outdoor burning may be temporarily suspended."
  },
  {
    category: "Safety & Guidelines",
    q: "What safety equipment is required in every WanderLust stay?",
    a: "Every home is inspected for working photoelectric smoke detectors, carbon monoxide monitors, serviced fire extinguishers, an illuminated first-aid kit, and an emergency flashlight."
  },

  // Pets, Families & Accessibility (7 items)
  {
    category: "Pets, Families & Accessibility",
    q: "Are pets allowed and what pet amenities are provided in pet-friendly homes?",
    a: "Over 40% of our properties are warmly pet-friendly! They provide water bowls, washable pet blankets, organic dog treats, and recommendations for dog-friendly nature trails and lakes."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "Is there an additional pet cleaning fee?",
    a: "Properties that permit pets charge a modest flat pet fee (typically $35–$65 per stay) to cover specialized hypoallergenic vacuuming and linen care between guests."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "Are WanderLust properties child-friendly and suitable for toddlers?",
    a: "Many homes are wonderful for families, featuring enclosed gardens, board games, and nature books. For homes with steep cliff drops, open spiral staircases, or deep ponds, safety notices are prominently highlighted."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "Do homes provide cribs, high chairs, or baby travel equipment?",
    a: "Properties tagged with 'Family Friendly' provide wooden cribs or pack-and-plays, high chairs, silicone dishware, and safety socket covers upon prior request."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "How do I find step-free, wheelchair accessible, or single-story sanctuaries?",
    a: "Use our 'Accessibility' filter in the explore directory. You can filter for step-free property entrances, wide doorways (32+ inches), roll-in curbless showers, grab bars, and ground-floor master suites."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "Are service and assistance animals allowed at all properties?",
    a: "In accordance with global accessibility guidelines, recognized service animals accompanying guests with disabilities are welcomed at all properties without pet surcharges."
  },
  {
    category: "Pets, Families & Accessibility",
    q: "Are the staircases and loft beds secure for older guests or young children?",
    a: "Properties with loft stairs or ships ladders include detailed architectural notes and photographs so you can choose the layout that matches your mobility needs."
  },

  // Sustainability & Eco-Stewardship (7 items)
  {
    category: "Sustainability & Eco-Stewardship",
    q: "What are WanderLust's environmental and eco-architecture benchmarks?",
    a: "We curate homes prioritizing passive solar orientation, heavy insulation, reclaimed timber, geothermal or heat pump climate control, and zero reliance on single-use plastics."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "How do off-grid water conservation and rainwater harvesting systems function?",
    a: "Many wilderness stays utilize UV-filtered rainwater systems and state-of-the-art closed-loop graywater recycling. Clear, intuitive instructions for low-impact showers and botanical toiletries are provided."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "Are electric vehicle (EV) charging stations available on-site?",
    a: "Yes. More than 350 properties feature Level 2 (240V) J1772 or Tesla Universal EV destination chargers available for complimentary overnight vehicle charging."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "How does WanderLust give back to local conservation and land trusts?",
    a: "1% of all WanderLust platform revenue is directly donated to regional wildlife corridor protection, ancient forest conservation, and indigenous land preservation trusts."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "What waste sorting, composting, and zero-waste policies do hosts follow?",
    a: "Every home provides marked recycling stations for glass, paper, and aluminum, as well as countertop cedar compost bins for food scraps to nourish local gardens."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "Can I offset the carbon footprint of my journey when booking?",
    a: "Yes! At checkout, you can toggle our Gold Standard Certified Carbon Offset program with a single click ($4–$12 based on travel distance), funding reforestation initiatives."
  },
  {
    category: "Sustainability & Eco-Stewardship",
    q: "Are the guest amenities (coffee, soaps, linens) ethically sourced?",
    a: "All complimentary soaps, shampoos, tea, and coffee provided across our collection are organic, cruelty-free, and packaged in refillable amber glass or compostable paper."
  },

  // Experiences & Concierge (7 items)
  {
    category: "Experiences & Concierge",
    q: "Can WanderLust arrange private chefs, foraged tastings, or yoga instructors?",
    a: "Yes. In select regions, our concierge connects guests with private local farm-to-table chefs, wine sommeliers, certified herbal foragers, and private sound bath instructors."
  },
  {
    category: "Experiences & Concierge",
    q: "Will I receive personalized host guidebooks with neighborhood secrets?",
    a: "Yes! Each host provides an exclusive handcrafted field guide spotlighting hidden swimming holes, independent bakeries, pottery workshops, and scenic trailheads that don't appear in commercial travel guides."
  },
  {
    category: "Experiences & Concierge",
    q: "Can the concierge team assist with regional car rentals, ferry or train bookings?",
    a: "Our guest team is happy to advise on regional rail connections, scenic electric car rentals, and alpine ferry timetables to make your arrival stress-free."
  },
  {
    category: "Experiences & Concierge",
    q: "Are seasonal sports gear (snowshoes, kayaks, paddleboards, gravel bikes) provided?",
    a: "Properties located near lakes, rivers, or alpine trails frequently provide complimentary equipment including touring kayaks, stand-up paddleboards, snowshoes, or vintage cruiser bikes."
  },
  {
    category: "Experiences & Concierge",
    q: "Can I host a quiet wellness retreat or meditation circle?",
    a: "Many of our architectural barn conversions and geodesic domes are specifically designed with panoramic views and hardwood floors for mindful yoga, breathwork, and quiet reflection."
  },
  {
    category: "Experiences & Concierge",
    q: "How do I request grocery stocking or firewood delivery prior to arrival?",
    a: "Simply message your host 72 hours before arrival. Many hosts offer farm-fresh local egg baskets, sourdough bread loaves, regional artisan cheese boxes, and firewood bundles ready in your kitchen."
  },
  {
    category: "Experiences & Concierge",
    q: "What if I need recommendations for bespoke hiking itineraries or wilderness permits?",
    a: "Hosts are passionate stewards of their surrounding terrain. They can advise on park permits, bear safety canisters, tide tables, and sunrise viewpoints."
  }
];

const categoryIcons = {
  "All Categories": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  "General & Philosophy": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "Booking & Reservations": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  "Stays & Amenities": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "Remote Work & WiFi": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "Hosting & Curation": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Payments, Refunds & Insurance": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  "Safety & Guidelines": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "Pets, Families & Accessibility": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  "Sustainability & Eco-Stewardship": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  "Experiences & Concierge": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndices, setOpenIndices] = useState({});
  const [helpfulFeedback, setHelpfulFeedback] = useState({});
  const revealRefs = useRef([]);

  const categories = [
    "All Categories",
    "General & Philosophy",
    "Booking & Reservations",
    "Stays & Amenities",
    "Remote Work & WiFi",
    "Hosting & Curation",
    "Payments, Refunds & Insurance",
    "Safety & Guidelines",
    "Pets, Families & Accessibility",
    "Sustainability & Eco-Stewardship",
    "Experiences & Concierge"
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim()) return matchesSearch;
    if (activeCategory === "All Categories") return true;
    return faq.category === activeCategory;
  });

  const toggleAccordion = (idx) => {
    setOpenIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleExpandAll = () => {
    const allState = {};
    filteredFaqs.forEach((_, idx) => {
      allState[idx] = true;
    });
    setOpenIndices(allState);
  };

  const handleCollapseAll = () => {
    setOpenIndices({});
  };

  const markHelpful = (idx, isHelpful) => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [idx]: isHelpful
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.05 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const activeCount = filteredFaqs.length;

  return (
    <div className="bg-paper min-h-screen text-ink font-sans selection:bg-moss selection:text-paper pt-16">
      <Navbar />

      {/* Top Banner Stats */}
      <section className="bg-sand/35 border-b border-ink/10 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-ink/75">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Comprehensive Help Center & Slow Travel Compendium</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-clay" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              70 Curated Answers
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-moss" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              934 Architectural Stays
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-clay" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              24/7 Concierge Support
            </span>
          </div>
        </div>
      </section>

      {/* Hero & Search Header */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pt-16 pb-12 max-w-4xl mx-auto text-center">
        <span ref={addToRefs} className="text-xs font-bold tracking-[.2em] text-clay uppercase block mb-3 opacity-0 translate-y-8 transition-all duration-700 ease-out">
          Knowledge Base & Policies
        </span>
        <h1 
          ref={addToRefs}
          className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[.95] tracking-[-.04em] mb-6 text-ink opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          Frequently Asked Questions
        </h1>
        <p 
          ref={addToRefs}
          className="text-base md:text-lg text-ink/75 max-w-2xl mx-auto mb-10 opacity-0 translate-y-8 transition-all duration-1000 delay-100 ease-out"
        >
          Explore in-depth guidance on Slow Travel, architectural curation, off-grid workations, transparent booking rules, host partnerships, and guest protection.
        </p>

        {/* Live Search Input */}
        <div ref={addToRefs} className="relative max-w-2xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
          <input 
            type="text" 
            placeholder="Search all 70 questions (e.g. WiFi speed, cancellation, dog friendly, solar power)..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndices({});
            }}
            className="w-full py-4.5 pl-12 pr-12 bg-white rounded-2xl shadow-sm border border-ink/15 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/20 text-base text-ink placeholder:text-ink/40 transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clay pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/50 hover:text-ink transition bg-sand/50 px-2.5 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Quick Jump Category Cards */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.filter(c => c !== "All Categories").slice(0, 10).map((cat, i) => {
            const count = faqs.filter(f => f.category === cat).length;
            const isSelected = activeCategory === cat && !searchQuery;
            return (
              <button
                key={i}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                  setOpenIndices({});
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected 
                    ? "bg-ink text-paper border-ink shadow-md translate-y-[-2px]" 
                    : "bg-white hover:bg-sand/30 text-ink border-ink/10 hover:border-ink/20 shadow-sm"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl grid place-items-center mb-3 transition-colors ${
                  isSelected ? "bg-paper/20 text-paper" : "bg-sand/40 text-clay group-hover:bg-sand"
                }`}>
                  {categoryIcons[cat]}
                </div>
                <div>
                  <div className={`text-xs font-bold leading-tight line-clamp-2 ${isSelected ? "text-paper" : "text-ink"}`}>
                    {cat}
                  </div>
                  <div className={`text-[10px] mt-1 font-medium ${isSelected ? "text-paper/70" : "text-ink/50"}`}>
                    {count} Questions
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Category Pills Navigation */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-ink/10 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, i) => {
              const isSelected = activeCategory === cat && !searchQuery;
              const count = cat === "All Categories" ? faqs.length : faqs.filter(f => f.category === cat).length;
              return (
                <button
                  key={i}
                  onClick={() => { 
                    setActiveCategory(cat); 
                    setSearchQuery("");
                    setOpenIndices({}); 
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
                    isSelected
                      ? "bg-ink text-paper shadow-sm"
                      : "bg-sand/40 text-ink/70 hover:bg-sand hover:text-ink"
                  }`}
                >
                  <span className="opacity-80">{categoryIcons[cat]}</span>
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-paper/20 text-paper" : "bg-ink/10 text-ink/70"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expand / Collapse Controls */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={handleExpandAll}
              className="px-3 py-1.5 rounded-lg border border-ink/15 hover:border-ink/40 text-ink transition bg-white"
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-1.5 rounded-lg border border-ink/15 hover:border-ink/40 text-ink transition bg-white"
            >
              Collapse All
            </button>
          </div>
        </div>

        {searchQuery ? (
          <div className="text-center py-2">
            <p className="text-xs font-bold text-moss uppercase tracking-wider">
              Found {activeCount} {activeCount === 1 ? "answer" : "answers"} matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-ink/60 px-1">
            <span>Showing {activeCount} questions in <strong className="text-ink">{activeCategory}</strong></span>
            <span>Click any question to view complete details</span>
          </div>
        )}
      </section>

      {/* FAQ Accordion Section */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] pb-28 max-w-4xl mx-auto min-h-[450px]">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-sand/20 rounded-3xl border border-ink/10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sand/50 grid place-items-center text-clay">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-ink mb-2">No matching questions found</h3>
            <p className="text-ink/60 text-sm max-w-md mx-auto mb-6">
              We couldn't find any FAQs matching "{searchQuery}". Try searching for terms like "refund", "WiFi", "dogs", "deposit", or "heating".
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All Categories"); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-clay text-white rounded-full text-xs font-bold hover:bg-[#9e442b] transition shadow-sm"
            >
              Reset Search & Show All
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = !!openIndices[idx];
              const isHelpful = helpfulFeedback[idx];

              return (
                <div 
                  key={idx} 
                  className={`bg-white rounded-2xl border transition-all duration-300 ${
                    isOpen ? "border-clay shadow-md ring-1 ring-clay/20" : "border-ink/10 hover:border-ink/25 shadow-sm"
                  }`}
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 flex justify-between items-start text-left focus:outline-none group gap-4"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-clay tracking-wide uppercase">
                          {faq.category}
                        </span>
                        <span className="text-ink/30">•</span>
                        <span className="text-[11px] font-medium text-ink/50">
                          Q{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-clay transition-colors leading-snug">
                        {faq.q}
                      </h3>
                    </div>

                    <span className={`flex-shrink-0 grid place-items-center w-8 h-8 rounded-full bg-sand/40 text-ink transition-transform duration-300 ${isOpen ? "rotate-180 bg-clay text-white" : "group-hover:bg-sand"}`}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2.5]">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div 
                    className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-3 border-t border-ink/10 text-ink/80 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </div>

                    {/* Was this helpful feedback bar */}
                    <div className="mt-4 pt-3 border-t border-ink/5 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/50">
                      <div className="flex items-center gap-2">
                        <span>Was this answer helpful?</span>
                        {isHelpful === true ? (
                          <span className="font-bold text-moss flex items-center gap-1">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Thanks for your feedback!
                          </span>
                        ) : isHelpful === false ? (
                          <span className="font-bold text-clay">We will improve this answer.</span>
                        ) : (
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => markHelpful(idx, true)}
                              className="px-2 py-0.5 rounded border border-ink/15 hover:border-ink/40 hover:bg-sand/30 transition text-ink font-medium"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => markHelpful(idx, false)}
                              className="px-2 py-0.5 rounded border border-ink/15 hover:border-ink/40 hover:bg-sand/30 transition text-ink font-medium"
                            >
                              No
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-ink/40">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-moss" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Verified WanderLust Policy</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="px-[clamp(1.25rem,4vw,4.5rem)] py-20 bg-moss text-paper text-center border-t border-ink/10 relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-xs font-bold tracking-[.2em] text-sand uppercase block mb-2">Can't find your answer?</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Our Concierge Team is Here</h2>
          <p className="text-paper/80 text-base mb-8 max-w-lg mx-auto">
            Whether you are coordinating an architectural sabbatical, inquiring about specific off-grid amenities, or applying to host, our local guides respond promptly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-clay text-paper rounded-full font-bold text-sm hover:bg-[#9e442b] transition-all shadow-md hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Message Concierge
            </Link>
            <Link 
              href="/explore" 
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-paper/40 text-paper rounded-full font-bold text-sm hover:bg-paper hover:text-ink transition-all hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              Explore All 934 Stays
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
