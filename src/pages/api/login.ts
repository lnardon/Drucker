import type { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const password = JSON.parse(req.body);
  if (password === process.env.AUTH_ADMIN_PASSWORD) {
    res.status(200).json(true);
  } else {
    res.status(403).json(false);
  }
}
