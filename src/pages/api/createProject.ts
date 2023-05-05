import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function createProject(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const name = req.body;

    if (!name) {
      return res.status(400).json({ error: "Project Name is required" });
    }

    try {
      const project = await prisma.project.create({ data: { name: name } });
      await prisma.$disconnect();
      res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the project." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
