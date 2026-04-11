import { getAdminSession } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

// Allow up to 60 s for large uploads
export const maxDuration = 60;

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];
  if (!files.length) {
    return Response.json({ error: "No files provided" }, { status: 400 });
  }

  const results = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const isVideo = file.type.startsWith("video/");

      const uploaded = await uploadToCloudinary(buffer, {
        resource_type: isVideo ? "video" : "image",
      });

      const media = await prisma.media.create({
        data: {
          url:      uploaded.secure_url,
          publicId: uploaded.public_id,
          type:     isVideo ? "video" : "image",
          width:    uploaded.width,
          height:   uploaded.height,
          format:   uploaded.format,
        },
      });

      results.push(media);
    } catch (err) {
      errors.push(`${file.name}: ${err instanceof Error ? err.message : "upload failed"}`);
    }
  }

  return Response.json({ uploaded: results, errors }, { status: 201 });
}
