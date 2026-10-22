const mongoose = require("mongoose");

const LOCAL_URI = process.env.LOCAL_URI || "mongodb://127.0.0.1:27017/wanderlust";
const ATLAS_URI = process.argv[2] || process.env.ATLASDB_URL;

if (!ATLAS_URI) {
  console.error("Please provide the Atlas URI as an argument or ATLASDB_URL env var.");
  process.exit(1);
}

// Ensure the db name is 'wanderlust'
function normalizeAtlasUri(uri) {
  try {
    const url = new URL(uri);
    if (!url.pathname || url.pathname === "/" || url.pathname === "") {
      url.pathname = "/wanderlust";
    }
    return url.toString();
  } catch (e) {
    if (uri.includes("mongodb.net/?")) {
      return uri.replace("mongodb.net/?", "mongodb.net/wanderlust?");
    }
    return uri;
  }
}

async function migrate() {
  const targetAtlasUri = normalizeAtlasUri(ATLAS_URI);
  console.log(`Connecting to Local DB: ${LOCAL_URI}`);
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log("Connected to Local DB successfully.");

  console.log(`Connecting to MongoDB Atlas: ${targetAtlasUri.replace(/:([^:@]+)@/, ":****@")}`);
  const atlasConn = await mongoose.createConnection(targetAtlasUri, {
    serverSelectionTimeoutMS: 15000,
  }).asPromise();
  console.log("Connected to MongoDB Atlas successfully!");

  // Step 1: Read local data
  const localListingsCol = localConn.db.collection("listings");
  const localUsersCol = localConn.db.collection("users");
  const localReviewsCol = localConn.db.collection("reviews");

  const listings = await localListingsCol.find({}).toArray();
  const users = await localUsersCol.find({}).toArray();
  const reviews = await localReviewsCol.find({}).toArray();

  console.log(`\nFound in Local DB:`);
  console.log(` - Listings: ${listings.length}`);
  console.log(` - Users:    ${users.length}`);
  console.log(` - Reviews:  ${reviews.length}`);

  // Step 2: Clear Atlas collections in target database
  console.log("\nClearing existing Atlas collections in wanderlust database...");
  const atlasListingsCol = atlasConn.db.collection("listings");
  const atlasUsersCol = atlasConn.db.collection("users");
  const atlasReviewsCol = atlasConn.db.collection("reviews");

  await atlasListingsCol.deleteMany({});
  await atlasUsersCol.deleteMany({});
  await atlasReviewsCol.deleteMany({});
  console.log("Atlas collections cleared.");

  // Step 3: Insert into Atlas
  if (users.length > 0) {
    console.log(`Migrating ${users.length} users to Atlas...`);
    await atlasUsersCol.insertMany(users);
  }

  if (listings.length > 0) {
    console.log(`Migrating ${listings.length} listings to Atlas...`);
    // Insert in batches of 100 for safety
    const batchSize = 100;
    for (let i = 0; i < listings.length; i += batchSize) {
      const batch = listings.slice(i, i + batchSize);
      await atlasListingsCol.insertMany(batch);
      process.stdout.write(`Migrated ${Math.min(i + batchSize, listings.length)} / ${listings.length} listings\r`);
    }
    console.log(`\nSuccessfully inserted all ${listings.length} listings.`);
  }

  if (reviews.length > 0) {
    console.log(`Migrating ${reviews.length} reviews to Atlas...`);
    await atlasReviewsCol.insertMany(reviews);
  }

  // Step 4: Verification
  const atlasListingsCount = await atlasListingsCol.countDocuments();
  const atlasUsersCount = await atlasUsersCol.countDocuments();
  const atlasReviewsCount = await atlasReviewsCol.countDocuments();

  console.log("\nMigration Verification in MongoDB Atlas:");
  console.log(` - Atlas Listings: ${atlasListingsCount} / ${listings.length}`);
  console.log(` - Atlas Users:    ${atlasUsersCount} / ${users.length}`);
  console.log(` - Atlas Reviews:  ${atlasReviewsCount} / ${reviews.length}`);

  await localConn.close();
  await atlasConn.close();

  if (atlasListingsCount === listings.length && atlasUsersCount === users.length) {
    console.log("\nMIGRATION COMPLETED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("\nCount mismatch detected!");
    process.exit(1);
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
