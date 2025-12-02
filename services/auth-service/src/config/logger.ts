import { config } from ".";
import { getLogger } from "@vbank/logger";

const logger = getLogger(config.SERVICE_NAME, "info");

export default logger;
