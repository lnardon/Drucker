import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function createEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, time, projectId, tags } = JSON.parse(req.body);

    if (!name && !time) {
      return res
        .status(400)
        .json({ error: "Entry Name and Time are required!" });
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
          tags: {
            create: tags,
          },
        },
        include: {
          tags: true,
        },
      });

      await prisma.$disconnect();
      res.status(200).json(newEntry);
    } catch (error) {
      console.log(error, tags);
      res.status(500).json({ error: "Error creating the entry" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
