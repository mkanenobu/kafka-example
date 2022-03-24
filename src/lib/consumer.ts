import type { Consumer as ConsumerType } from "kafkajs";
import { kafkaClient } from "./kafka";

export class Consumer {
  protected consumer: ConsumerType;
  protected topic: string;

  constructor({ groupId, topic }: { groupId: string; topic: string }) {
    this.consumer = kafkaClient.consumer({ groupId });
    this.topic = topic;
  }

  public consume = async (): Promise<void> => {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });

    try {
      return this.consumer.run({
        eachMessage: async ({ message }) => {
          console.log("Message received, ", message.value?.toString());
        },
      });
    } finally {
      await this.consumer.disconnect();
    }
  };
}
