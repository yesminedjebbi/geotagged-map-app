import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { generateImageDescription } from "@/lib/ai";
import ExifReader from "exifr";

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

    // GET FILE
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    //FILE to BUFFER
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //UPLOAD CLOUDINARY
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    //EXIF GPS
    const exif = await ExifReader.parse(buffer);

    const latitude = exif?.latitude || 0;
    const longitude = exif?.longitude || 0;

    // AI IMAGE DESCRIPTION
    let description = "";

    try {
      description = await generateImageDescription(imageUrl);
    } catch (err) {
      console.error("AI error:", err);
      description = "No description available";
    }

    // SAVE IN DATABASE
    const photo = await prisma.photo.create({
      data: {
        imageUrl,
        latitude,
        longitude,
        aiDescription: description, 
        userId,
      },
    });

    return Response.json(photo);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}