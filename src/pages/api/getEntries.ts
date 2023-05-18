import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getEntries(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const projectId = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    try {
      const projectEntries = await prisma.entry.findMany({
        where: {
          projectId: projectId,
        },
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      await prisma.$disconnect();
      res.status(200).json(projectEntries);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching project entries" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
