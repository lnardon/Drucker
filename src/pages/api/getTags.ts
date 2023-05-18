import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const projectTags = await prisma.tag.findMany({});

    await prisma.$disconnect();
    res.status(200).json(projectTags);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching project tags" });
  }
}
