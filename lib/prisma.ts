// prisma.ts
import { PrismaClient } from "@prisma/client";

const globalNodeJS = global as unknown as typeof global & {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalNodeJS.prisma) {
    globalNodeJS.prisma = new PrismaClient();
  }
  prisma = globalNodeJS.prisma;
}

export default prisma;
