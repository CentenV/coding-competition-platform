// Core Service Abstract - Unit Test //
/*
 * Test plan:
 *
 * - CodeCompPlatService
 *  - constructor
 *  - start
 * 
*/

import { describe, expect, test } from "vitest"
import { Service } from "../src/service.ts";
// import { logger } from "@codecompplat/config-logger"

class SampleService extends Service {
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
  });

  // test("shutdown", () => {
  //   const x = vi.spyOn(logger, "info")
  //
  //   const sampleService = new SampleService().shutdown();
  //
  //   expect(x).toHaveBeenCalledOnce();
  // });

  // TODO: Add more tests
});
