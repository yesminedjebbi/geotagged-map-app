import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ photoId: string }> }
) {
  const { photoId } = await params;

  const comments = await prisma.comment.findMany({
    where: { photoId },
    orderBy: { createdAt: "desc" },
      include: {
      user: {
        select: {
          email: true, 
        },
      },
    },
  });

  return Response.json(comments);
}