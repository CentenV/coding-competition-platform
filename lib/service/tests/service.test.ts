// Core Service Abstract - Unit Test //
/*
 * Test plan:
 *
 * - CodeCompPlatService
 *  - constructor
 *  - start
 * 
*/

import { assert, describe, expect, test } from "vitest"
import { CodeCompPlatService } from "../src/service";

class SampleService extends CodeCompPlatService {
  constructor() {
    super("Sample")
  }

  public cycle(): void {
    const x = 1 + 1;
  }
}

describe("CodeCompPlatService", () => {
  test("constructor", () => {
    const sampleService = new SampleService();
    expect(sampleService.name).toBe("Sample")
  })
});
