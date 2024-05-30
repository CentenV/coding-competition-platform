import Image from "next/image";

import { PrismaClient } from '@prisma/client';
import SandboxPage from "./sandbox/page";
const prisma = new PrismaClient();

export default function Home() {
  return (
    // <div className="p-8">
    <div>
      {/* <SandboxPage /> */}
    </div>
  );
}
