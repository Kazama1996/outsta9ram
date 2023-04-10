const { createClient } = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = createClient(redisUrl);

client.on("error", (err) => console.log("redis client error", err));
client.connect();

exports.getSearchHistory = async (req, res, next) => {
  const history = await client.HGET(`${req.user}`, "history");
  const splitArr = history.split(" ");
  let objArr = [];
  splitArr.forEach((el) => {
    objArr.push(JSON.parse(el));
  });
  console.log(typeof history);
  res.status(200).send(objArr);
};

exports.pushIntoQueue = async (req, res, next) => {
  const obj = req.body;
  const str = JSON.stringify(obj);

  if (!(await client.SISMEMBER(`${req.user}:history_set`, str))) {
    if ((await client.LLEN(`${req.user}:history`)) < 5) {
      await client.LPUSH(`${req.user}:history`, str);
      await client.SADD(`${req.user}:history_set`, str);
    } else {
      const pop_item = await client.RPOP(`${req.user}:history`);
      await client.SREM(`${req.user}:history_set`, `${pop_item}`);
      await client.LPUSH(`${req.user}:history`, str);
      await client.SADD(`${req.user}:history_set`, str);
    }
    const historyQueue = await client.LRANGE(`${req.user}:history`, 0, -1);
    const combineStr = historyQueue.join(" ");
    await client.HSET(`${req.user}`, "history", combineStr);
  }

  res.status(200).send("push into queue");
};

// push(item){
// 	if(list size < 5 ){
// 		if(!set.SISMEMBER(item)){
// 			list.Lpush(item);
// 			set.ADD(item)
// 		}
// 	}
// 	else{
// 		if(!set.SISMEMBER(item)){
// 			pop_item=list.Rpop();
// 			set.SREM(pop_item);
// 			list.Lpush(item);
// 			set.ADD(item)
// 		}
// 	}
// }
