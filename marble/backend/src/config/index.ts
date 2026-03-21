export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3001,
  environment: process.env.NODE_ENV || "production",
  allowedOrigin: "https://localhost:3000"
} as const;