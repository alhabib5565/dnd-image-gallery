import cn from "../utils/cn";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TImageGallery } from "../types";

interface TImageCard extends TImageGallery {
  handleImageSelect: (id: string) => void;
}

const ImageCard = ({ id, slug, isSelected, handleImageSelect }: TImageCard) => {
  const {
    transform,
    transition,
    setNodeRef,
    index,
    listeners,
    attributes,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      style={style}
      ref={setNodeRef}
      className={cn(
        "relative group border rounded-md aspect-square object-cover",
        index === 0 ? "col-span-2 row-span-2" : "",
        { "z-10": isDragging }
      )}
    >
      <button
        onClick={() => handleImageSelect(id)}
        className={cn(
          "absolute top-2 left-2 z-10 scale-0 group-hover:scale-100 transition-all",
          { "scale-100": isSelected }
        )}
      >
        {isSelected ? (
          <svg
            className="w-8 h-8 text-blue-600 rounded-md"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" />
            </g>
          </svg>
        ) : (
          <svg
            className="w-8 h-8 rounded-md"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
            </g>
          </svg>
        )}
      </button>
      <button
        {...listeners}
        {...attributes}
        role="button"
        className={cn(
          "absolute inset-0 bg-black/20 rounded-md scale-0 group-hover:scale-100 transition-all",
          {
            "opacity-0": isSelected,
          }
        )}
      ></button>
      <img
        className={cn("w-full h-full object-cover rounded-md")}
        src={slug}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
