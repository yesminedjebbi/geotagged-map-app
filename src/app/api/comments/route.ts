import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    // AUTH 
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const payload = token ? verifyToken(token) : null;

    if (!payload) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = (payload as any).userId;

    // GET BODY
    const { text, photoId } = await req.json();

    if (!text || !photoId) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // CREATE COMMENT
    const comment = await prisma.comment.create({
      data: {
        text,
        photoId,
        userId, 
      },
    });

  
    return Response.json(comment);
  } catch (error) {
    console.error("COMMENT ERROR:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}