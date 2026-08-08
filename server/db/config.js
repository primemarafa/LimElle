const DEFAULT_DATABASE_URL = "postgresql://localhost:5432/limelle";

export function getDatabaseConfig(env = process.env) {
  return {
    url: env.DATABASE_URL || DEFAULT_DATABASE_URL,
    ssl: env.DATABASE_SSL === "true",
  };
}
