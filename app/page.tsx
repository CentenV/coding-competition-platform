import Image from "next/image";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// async function test() {
//   const test: any = await prisma.competitor.findMany();
//   console.log(test);
// }

export default function Home() {
  // test();

  return (
    <div className="p-8">
      <div>Coding Competition Platform</div>
      <div>test</div>
    </div>
  );
}
