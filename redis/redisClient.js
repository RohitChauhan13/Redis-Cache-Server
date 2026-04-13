const redis = require("redis");

const redisClient = redis.createClient({
    url: "redis://127.0.0.1:6379",   // Redis server address
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.log("Redis retry attempts exhausted");
                return new Error("Retry attempts exhausted");
            }
            return 2000; // retry after 2 sec
        }
    }
});

redisClient.on("connect", () => {
    console.log("Redis connecting...");
});

redisClient.on("ready", () => {
    console.log("Connected to Redis");
});

redisClient.on("end", () => {
    console.log("Redis connection closed");
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err.message);
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Redis connection failed:", err.message);
    }
})();

module.exports = redisClient;