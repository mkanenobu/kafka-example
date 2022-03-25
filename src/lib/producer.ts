import type {
  Producer as ProducerType,
  ProducerRecord,
  RecordMetadata,
} from "kafkajs";
import { kafkaClient } from "./kafka";

export class Producer {
  protected producer: ProducerType;
  constructor() {
    this.producer = kafkaClient.producer();
  }

  public send = async (params: ProducerRecord): Promise<RecordMetadata[]> => {
    await this.producer.connect();
    const sendResult = await this.producer.send(params);
    await this.producer.disconnect();
    return sendResult;
  };
}
