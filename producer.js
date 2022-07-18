import { v4 as uuid4 } from "uuid";
import { kafka } from "./connection.js";

export async function publish() {
  let producer;

  try {
    producer = kafka.producer();

    // connect to aiven kafka service
    console.log("Connecting to kafka...");
    await producer.connect();
    console.log("Connection to Kafka succesful");

    // send message to kafka service
    const result = await producer.send({
      // topic as created in Aiven console
      topic: "battery-alerts",
      messages: [
        {
          // message key to determine topic partition
          key: JSON.stringify(uuid4()),

          // message itself sent as JSON with battery percentage along with timestamp in ISO format
          value: JSON.stringify({
            deviceId: "securityCam-front-1",
            batteryPercent: 14,
            timeStamp: new Date().toISOString(),
          }),
        },
      ],
    });

    console.log("Message sent succesfully", result);
  } catch (error) {
    console.log("Something went wrong:", error);
  } finally {
    // disconnect from kafka service before exiting
    if (producer) {
      await producer.disconnect();
    }
  }
}
