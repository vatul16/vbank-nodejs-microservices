import { USER_TOPICS } from "@vbank/constants";
import logger from "../../config/logger";

import { producer } from "../kafka";

export const publishUserRegistered = async (data: any) => {
  const topic = USER_TOPICS.USER_REGISTERED;

  logger.info(
    `publishing message to topic: ${topic} with message: ${JSON.stringify(data)}`,
  );

  await producer.send({
    topic,
    messages: [
      {
        key: data.key,
        value: JSON.stringify(data.value),
      },
    ],
  });
};
