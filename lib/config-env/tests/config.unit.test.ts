import { describe, expect, test, vi } from "vitest"
import { getEnvConfig } from "../src/config.ts"

import { CodeCompPlatError } from "@codecompplat/ccp-error"

describe("getEnvConfig", () => {

  test("strict success", () => {
    const ENV_KEY = "MY_ENV_1";
    const ENV_VAL = "100v100";

    vi.stubEnv(ENV_KEY, ENV_VAL)
    expect(getEnvConfig({ envVariableName: ENV_KEY })).toBe(ENV_VAL);
  });

  test("strict fail", () => {
    expect(() => getEnvConfig({ envVariableName: "MY_ENV_1_doesnt_exist" })).toThrowError(CodeCompPlatError);
  });
  
  test("nonstrict success", () => {
    const ENV_KEY = "MY_ENV_1";
    const ENV_VAL = "100v100";

    vi.stubEnv(ENV_KEY, ENV_VAL)
    expect(getEnvConfig({ envVariableName: ENV_KEY, defaultValue: "hello world" })).toBe(ENV_VAL);
  });

  test("nonstrict fail", () => {
    expect(getEnvConfig({ envVariableName: "MY_ENV_2_doesnt_exist", defaultValue: "hello world" })).toBe("hello world")
  });

});

