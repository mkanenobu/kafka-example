import type { Consumer as ConsumerType, KafkaMessage } from "kafkajs";
import { kafkaClient } from "./kafka";

export class Consumer {
  protected consumer: ConsumerType;
  protected topic: string;

  constructor({ groupId, topic }: { groupId: string; topic: string }) {
    this.consumer = kafkaClient.consumer({ groupId });
    this.topic = topic;
  }

  public consume = async (
    messageHandler: (msg: KafkaMessage) => Promise<void>
  ): Promise<void> => {
    await this.consumer.connect().then(() => console.log("Consumer connected"));
    await this.consumer
      .subscribe({ topic: this.topic, fromBeginning: true })
      .then(() => console.log("Consumer subscribed"));

    this.consumer
      .describeGroup()
      .then((description) =>
        console.log(
          `Consumer group: ${description.groupId} is in state ${description.state}`
        )
      );

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        messageHandler(message);
      },
    });
  };
}
