import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos = await prisma.photo.findMany();

  return Response.json(photos);
}