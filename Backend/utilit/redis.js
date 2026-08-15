import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;
const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () =>
  console.log("Connected to Redis Successfully!"),
);

await redisClient.connect();

export default redisClient;
