import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function deleteTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const id = req.body;

    if (!id) {
      return res.status(400).json({ error: "Tag ID is required" });
    }

    try {
      const project = await prisma.tag.delete({ where: { id: id } });
      await prisma.$disconnect();
      res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the tag." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
