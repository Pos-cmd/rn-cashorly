import { auth } from "@rn-cashory/auth";
import { env } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono()
  .use(logger())
  .use(
    "/*",
    cors({
      origin: env.CORS_ORIGIN,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-type", "Authorization", "Cookie"],
      credentials: true
    })
  )
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

app.onError((error, c) => {
  console.error("[Server Error]", error);
  return c.json({
     error: error.message || 'Internal Server Error', 
     ...(env.NODE_ENV === 'development' ? { stack: error.stack } : {})
    }, 500);
});

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

export type AppType = typeof app;
export default app;
