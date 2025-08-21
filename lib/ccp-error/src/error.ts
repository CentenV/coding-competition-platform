/**
 * Coding Competition Platform Error. Used when an error occurs in the scope of the platform
 * */
export class CodeCompPlatError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
    this.name = "CodeCompPlatError";
    this.message = errorMessage;
    Object.setPrototypeOf(this, CodeCompPlatError.prototype)
  }
}
