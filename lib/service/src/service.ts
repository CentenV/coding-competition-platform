/*
 * @file Core Service Abstract Class
 * @description Outlines the base behavior that is shared amongst all other services
 * */
import process from 'node:process';
import { logger } from "@codecompplat/logger"

export abstract class Service {
  private readonly name: string;

  /*
   * Creates a new service
   *
   * @param {string} service name
   * */
  constructor(name: string) {
    this.name = name;
  }

  /*
   * Start service. Invokes this.cycle() infinitely
   * */
  public start(): void {
    // Register signals
    const EXIT_SIGNALS = ["SIGINT", "SIGQUIT", "SIGTERM"]
    for (const SIG of EXIT_SIGNALS) {
      process.on(SIG, () => {
        this.handler(SIG);
      })
    }
    // Invoke cycle method
    logger.info(`${this.name} service is starting...`)
    while (true) { this.cycle() }
  }

  /*
   * Shutdown service
   * */
  public shutdown(): void {
    logger.info(`${this.name} service is shutting down...`)
    process.exit(0);
  }

  /*
   * Definition of one operation to be infinitely invoked by this.start()
   * */
  public abstract cycle(): void;

  /*
   * Process signal handler for defining behavior after a signal is received
   *
   * @param {string} signalName - Name of the system signal (i.e. SIGINT, SIGQUIT, etc.)
   * */
  private handler(signalName: string) {
    logger.info(`Received ${signalName}`)
    this.shutdown()
  }
}
