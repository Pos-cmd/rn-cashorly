import { expo } from "@better-auth/expo";
import { createDb } from "@rn-cashory/db";
import * as schema from "@rn-cashory/db/schema/auth";
import { env } from "@rn-cashory/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const devOrigins = env.NODE_ENV === 'development' ? ["*"] : [];

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
    }),
    trustedOrigins: [
      env.CORS_ORIGIN, 
      "rn-cashory://", 
      "rn-cashory.exp.direct://", 
      "mybettertapp://", 
      ...devOrigins,
    ],
    emailAndPassword: {
      enabled: true,
    },
    user: {
    additionalFields: {
      onboardingCompleted: {
        type: "boolean",
        required: false,
        input: true,
      },
      country: {
        type: "string",
        required: false,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      image: {
        type: "string",
        required: false,
        input: true,
      },
      currency: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
      },
    },
    plugins: [expo()],
  });
}

export const auth = createAuth();
