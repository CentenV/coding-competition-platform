// Logger //
// Library for application logging. It is a utility function to 

import type { Logger } from "pino";
import pino from "pino";

export const logger: Logger = pino({});
