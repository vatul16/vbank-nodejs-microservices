import { getLogger } from "@vbank/logger";
import { config } from ".";

const logger = getLogger(config.SERVICE_NAME, "info");

export default logger;
