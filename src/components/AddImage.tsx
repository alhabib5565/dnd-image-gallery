import React, { useEffect, useState } from "react";

const AddImage = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    const uploadImage = async () => {
      try {
        if (image) {
          const formData = new FormData();
          formData.append("image", image);

          const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_API
            }`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Image uploaded successfully:", data);
          }
        }
      } catch (error) {
        console.error("An error occurred during image upload:", error);
      }
    };

    uploadImage();
  }, [image]);

  return (
    <div className="h-full w-full flex justify-center items-center p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg mx-auto text-center cursor-pointer ">
      <input
        onChange={handleImageChange}
        id="upload"
        type="file"
        className="hidden"
        accept="image/*"
      />
      <label htmlFor="upload" className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-gray-700 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
          Add image
        </h5>
        <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
      </label>
    </div>
  );
};

export default AddImage;
