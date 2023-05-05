import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function projectsHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const project = await prisma.project.findMany();
  await prisma.$disconnect();
  res.json(project);
}
