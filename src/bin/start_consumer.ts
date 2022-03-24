import { Consumer } from "../lib/consumer";

const main = async () => {
  const consumer = new Consumer({ groupId: "test-group", topic: "test-topic" });
  await consumer.consume();
};

main();
