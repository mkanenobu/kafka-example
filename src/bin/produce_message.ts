import { Message } from "kafkajs";
import { Producer } from "../lib/producer";

const main = (messages: string[]) => {
  const msgs: Message[] = messages.map((msg) => ({
    value: msg || "Hello, World!",
  }));

  const producer = new Producer();

  return producer
    .send({
      topic: "test-topic",
      messages: msgs,
    })
    .then((r) => {
      console.log("Message sent", r);
    });
};

const msgs = process.argv.slice(2);

main(msgs);
