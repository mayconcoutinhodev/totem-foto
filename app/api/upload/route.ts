import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ success: false, error: "Sem arquivo" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-photo.png`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);
  
    const publicUrl = `/uploads/${fileName}`;

    const now = new Date();
    now.setHours(now.getHours() - 3);
    
    const imageRecord = await prisma.image.create({
      data: {
        url: publicUrl,
        filename: fileName,
        createdAt: now, 
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const viewPageUrl = `${baseUrl}/img/${imageRecord.id}`;
    
    const qrCodeBase64 = await QRCode.toDataURL(viewPageUrl, {
      margin: 2,
      scale: 10,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      }
    });

    return NextResponse.json({ 
      success: true, 
      qrCode: qrCodeBase64,
      id: imageRecord.id,
      timestamp: now.toISOString() 
    });

  } catch (error: any) {
    console.error("[NEX-LAB ERROR]:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Erro no processamento de dados" 
    }, { status: 500 });
  }
}