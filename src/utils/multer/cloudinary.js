import { v2 as cloudinary } from "cloudinary";

export const fileValidationTypes = {
  image: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
  video: ["video/mp4", "video/mkv"],
};

export async function cloud() {
  cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    // Click 'View API Keys' above to copy your API secret
  });
  return cloudinary;
}
