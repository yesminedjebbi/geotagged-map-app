import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = signToken({ userId: user.id });

  return Response.json({ token });
}