import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mediqueue";
const client = new MongoClient(uri);
const db = client.db("mediqueue");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "mediqueue-secure-jwt-auth-secret-key-32chars",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-google-secret",
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});
