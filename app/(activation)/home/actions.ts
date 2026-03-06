"use server"

import { prisma } from "../../../lib/prisma";


export async function getImagesFromDb() {
  try {
    return await prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12, 
    });
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
}