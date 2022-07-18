import { Kafka } from "kafkajs";
import fs from "fs";

// replace the value with your kafka service URI
// const AIVEN_KAFKA_SERVICE_URI = "YOUR KAFKA SERVICE URI";

const AIVEN_KAFKA_SERVICE_URI =
  "kafka-nodejs-amitgup-6336.aivencloud.com:12424";

// Configure kafkajs for connection to Aiven Kafka
export const kafka = new Kafka({
  clientId: "aiven-kafka-nodejs",
  brokers: [AIVEN_KAFKA_SERVICE_URI],
  logLevel: 1,
  ssl: {
    // CA Certificate downloaded from Aiven Console
    ca: [fs.readFileSync("./secrets/ca.cer", "utf-8")],

    // Access Key downloaded from Aiven Console
    key: fs.readFileSync("./secrets/service.key", "utf-8"),

    // Access Certificate downloaded from Aiven Console
    cert: fs.readFileSync("./secrets/service.cert", "utf-8"),
  },
});
