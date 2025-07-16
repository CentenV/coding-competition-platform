// Core Service Abstract //
// Outlines the base behavior that is shared amongst all other services

export abstract class CodeCompPlatService {
  private name: string;

  /*
   * Creates a new service
   * @param {string} name 
   * */
  constructor(name: string) {
    this.name = name;
  }

  /*
   * Start the service. Invokes this.cycle() infinitely until SIG
   * */
  public start(): void {
    // Register signals
    process.on("SIGINT", this.shutdown)
    process.on("SIGQUIT", this.shutdown)
    process.on("SIGTERM", this.shutdown)
    // Invoke cycle method
    while (true) { this.cycle() }
  }

  public abstract shutdown(): void;

  public abstract cycle(): void;
}
