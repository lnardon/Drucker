import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function createTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = JSON.parse(req.body);

    if (!name) {
      return res.status(400).json({ error: "Tag needs an unique name!" });
    }

    try {
      const newEntry = await prisma.tag.create({ data: { name } });

      await prisma.$disconnect();
      res.status(200).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: "Error creating the entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
