const mongoose = require("mongoose");
const { createClient } = require("redis");
const test =
  process.env.ENV.toString() == "DOCKER"
    ? "redis://redis:6379"
    : "redis://127.0.0.1:6379";
//const redisUrl = "redis://redis:6379";
const redisUrl = "redis://127.0.0.1:6379";
const client = createClient({
  lagacyMode: true,
  url: redisUrl,
});

client.on("error", (err) => console.log("redis client error", err));
client.connect();
const exec = mongoose.Aggregate.prototype.exec;

mongoose.Aggregate.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.targetUser = options.targetUser;
  this.hashKey = options.key;
  console.log("cache");
  return this;
};

mongoose.Aggregate.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  const cacheVal = await client.HGET(`${this.targetUser}`, `${this.hashKey}`);
  if (cacheVal) {
    const doc = JSON.parse(cacheVal);
    return [doc];
  }
  const result = await exec.apply(this, arguments);
  client.HSET(
    `${this.targetUser}`,
    `${this.hashKey}`,
    JSON.stringify(result[0])
  );
  return result;
};
