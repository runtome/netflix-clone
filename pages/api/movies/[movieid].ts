import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { movieid } = req.query;

    if (typeof movieid !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieid) {
      throw new Error('Missing Id');
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieid
      }
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}