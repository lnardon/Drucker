import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function createEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, time, projectId } = JSON.parse(req.body);

    if (!name) {
      return res.status(400).json({ error: "Entry Name is required" });
    }

    try {
      const newEntry = await prisma.entry.create({
        data: {
          name: name,
          time: time,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      await prisma.$disconnect();
      res.status(200).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: "Error creating the entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
