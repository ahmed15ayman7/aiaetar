import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
  secure:      true,
});

export { cloudinary };

/** Upload a Buffer to Cloudinary and return the result */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resource_type?: "image" | "video" | "auto";
    public_id?: string;
  } = {}
): Promise<{
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
}> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder:        options.folder ?? "aiaetar/gallery",
          resource_type: options.resource_type ?? "auto",
          public_id:     options.public_id,
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error("Upload failed"));
          resolve(result as ReturnType<typeof resolve> extends Promise<infer T> ? T : never);
        }
      )
      .end(buffer);
  });
}

/** Delete a resource from Cloudinary by its public_id */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" = "image"
) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
