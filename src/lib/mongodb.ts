import { MongoClient, type Db } from "mongodb";

/*
  MongoDB connection helper.

  Uses a cached client on `globalThis` so that:
   - In dev, Next.js HMR does not open a new pool on every reload.
   - On a long-lived Node server (Hostinger), a single pool is reused.
   - On serverless, warm invocations reuse the connection.

  Configure MONGODB_URI (and optionally MONGODB_DB) in the environment.
*/

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "obdistributions";

interface MongoCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

const globalForMongo = globalThis as unknown as { _mongo?: MongoCache };

const cache: MongoCache = globalForMongo._mongo ?? { client: null, promise: null };
if (!globalForMongo._mongo) globalForMongo._mongo = cache;

export async function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to your environment (see .env.example).",
    );
  }
  if (cache.client) return cache.client;
  if (!cache.promise) {
    cache.promise = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    }).connect();
  }
  cache.client = await cache.promise;
  return cache.client;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}

/** True when a DB connection string is configured. */
export function isDbConfigured(): boolean {
  return Boolean(uri);
}
