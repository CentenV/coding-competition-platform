/**
 * @file Exports the Prisma database client/objects. See: https://www.prisma.io/docs/guides/turborepo#24-export-the-prisma-client-and-types
 */

import { getEnvConfig } from "@codecompplat/config-env";
import { PrismaClient } from "./generated_client/client.js";

const globalPrisma = global as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient = globalPrisma.prisma || new PrismaClient();

if (getEnvConfig({ envVariableName: "NODE_ENV" }) !== "production") {
  globalPrisma.prisma = prisma;
}
