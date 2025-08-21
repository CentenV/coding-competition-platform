import "dotenv/config"
import { CodeCompPlatError } from "@codecompplat/ccp-error"

interface ConfigOptions<T extends string | number> {
  envVariableName: string,
  defaultValue?: T,
}

export function getEnvConfig({ envVariableName, defaultValue }: ConfigOptions<string>): string {
  // Get value from env
  // biome-ignore lint/style/noProcessEnv: process.env is needed to access environment variable
  const ENV_VAR: string | undefined = process.env[envVariableName];

  // Validation + erroring
  if (ENV_VAR === undefined && defaultValue === undefined) {
    throw new CodeCompPlatError(`Required environment variable ${envVariableName} not specified`)
  }
  
  return (ENV_VAR !== undefined) ? ENV_VAR : (defaultValue !== undefined) ? defaultValue : "";
}
