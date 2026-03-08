export const uploadProfileImage = async (file) => {

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "virtual-diary");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzm2smkci/image/upload",
    {
      method: "POST",
      body: data
    }
  );

  const result = await res.json();

  console.log("Cloudinary full response:", result);

  return result.secure_url;
};