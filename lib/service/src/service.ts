// Core Service Abstract //
// Outlines the base behavior that is shared amongst all other services
import process from 'node:process';
import { logger } from "@codecompplat/config-logger"

export abstract class CodeCompPlatService {
  private readonly name: string;

  /*
   * Creates a new service
   * @param {string} service name
   * */
  constructor(name: string) {
    this.name = name;
  }

  /*
   * Start the service. Invokes this.cycle() infinitely
   * */
  public start(): void {
    // Register signals
    const EXIT_SIGNALS = ["SIGINT", "SIGQUIT", "SIGTERM"]
    for (const sig of EXIT_SIGNALS) {
      process.on(sig, () => {
        this.handler(sig);
      })
    }
    // Invoke cycle method
    logger.info(`{this.name} service is starting...`)
    while (true) { this.cycle() }
  }

  public shutdown(): void {
    logger.info(`{this.name} service is shutting down...`)
  }

  public abstract cycle(): void;

  private handler(signalName: string) {
    logger.info(`Received {signalName}`)
    this.shutdown()
  }
}
