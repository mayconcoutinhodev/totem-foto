"use server"

import { prisma } from "../../lib/prisma";

export async function getImagesFromDb() {
  return await prisma.image.findMany({
    orderBy: { createdAt: 'desc' }
  });
}