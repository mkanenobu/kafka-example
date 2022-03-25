import { Kafka } from "kafkajs";

export const kafkaClient = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
  connectionTimeout: 3 * 1000,
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});
