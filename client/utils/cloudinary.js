import axios from "axios";

export const uploadToCloudinary = async (
  file,
  uploadPreset,
  folder = "",
  setUploadProgress
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  if (folder) {
    formData.append("folder", folder);
  }

  try {
    const resourceType = file.type.startsWith("video/") ? "video" : "image";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/${resourceType}/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (setUploadProgress) {
            setUploadProgress(percentCompleted);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Ошибка загрузки в Cloudinary:", error);
    throw error;
  }
};
