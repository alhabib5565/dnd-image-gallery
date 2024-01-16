import React, { useEffect, useState } from "react";
import { TImageGallery } from "../types";
import cn from "../utils/cn";
import { uploadImage } from "../utils/uploadImage";

const AddImage = ({
  setGalleryImages,
}: {
  setGalleryImages: React.Dispatch<React.SetStateAction<TImageGallery[]>>;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    const uploadImageAndSetGallery = async () => {
      try {
        if (image) {
          setLoading(true);
          const data = await uploadImage(image);
          setGalleryImages((prevGalleryImage) => [
            ...prevGalleryImage,
            {
              id: data.id,
              slug: data.display_url,
              isSelected: false,
            },
          ]);
          setLoading(false);
          setImage(null);
          console.log("Image uploaded successfully:", data);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    uploadImageAndSetGallery();
  }, [image, setGalleryImages]);

  return (
    <div
      className={cn(
        "h-full w-full p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg mx-auto text-center cursor-pointer aspect-square",
        {
          "cursor-not-allowed border-gray-100 border-solid": loading,
        }
      )}
    >
      <input
        onChange={handleImageChange}
        id="upload"
        type="file"
        className="hidden"
        accept="image/*"
        disabled={loading}
      />
      <label
        htmlFor="upload"
        className={cn(
          "h-full w-full flex justify-center items-center cursor-pointer",
          {
            "cursor-not-allowed": loading,
          }
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={cn("w-8 h-8 text-gray-700 mx-auto mb-4", {
            "text-gray-300": loading,
          })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <h5
          className={cn("mb-2 text-xl font-bold tracking-tight text-gray-700", {
            "text-gray-300": loading,
          })}
        >
          Add image
        </h5>
        <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
      </label>
    </div>
  );
};

export default AddImage;
