import { TImageGallery } from "../types";

const Header = ({
  galleryImages,
  handleImageDelete,
}: {
  galleryImages: TImageGallery[];
  handleImageDelete: () => void;
}) => {
  const selectedImages = galleryImages.filter((image) => image.isSelected);
  return (
    <header className="border-b-2 mb-6 pb-2 flex justify-between items-center gap-4 md:gap-0">
      {selectedImages.length ? (
        <>
          <h1 className="text-2xl font-medium">
            Selected image ({selectedImages.length})
          </h1>
          <button
            onClick={handleImageDelete}
            className="border-2 rounded-md px-3 py-1 bg-black/5 font-medium border-red-200 hover:border-red-400 text-red-600"
          >
            Delete
          </button>
        </>
      ) : (
        <h1 className="text-2xl font-medium">Gallery</h1>
      )}
    </header>
  );
};

export default Header;
