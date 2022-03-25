import type { KafkaMessage } from "kafkajs";
import { Consumer } from "../lib/consumer";

const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr));

const count = (haystack: string, needle: string): number =>
  haystack.split(needle).length - 1;

const messageHandler = async (msg: KafkaMessage) => {
  const message = msg.value?.toString();
  if (!message) {
    return;
  }
  const chars = uniq(message.split(""));
  chars.forEach((char) => {
    console.log(`${char}: ${count(message, char)}`);
  });
};

const main = async () => {
  const consumer = new Consumer({
    groupId: "test-group",
    topic: "test-topic",
  });
  await consumer.consume(messageHandler);
};

main();
