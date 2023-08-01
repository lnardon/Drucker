import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function getProjectStats(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const projectId = req.body;

    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    try {
      const total_time = await prisma.entry.aggregate({
        _sum: {
          time: true,
        },
        where: {
          projectId: projectId,
        },
        orderBy: {
          time: "desc",
        },
      });

      let sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const last_7_days = await prisma.entry.aggregate({
        _sum: {
          time: true,
        },
        where: {
          projectId: projectId,
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      });

      let thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const last_30_days = await prisma.entry.aggregate({
        _sum: {
          time: true,
        },
        where: {
          projectId: projectId,
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      });

      await prisma.$disconnect();
      res.status(200).json({
        total_time: total_time._sum.time,
        last_7_days: last_7_days._sum.time,
        last_30_days: last_30_days._sum.time,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching project entries" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
