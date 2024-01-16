import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Header from "./components/Header";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { initialImageData } from "./data";
import cn from "./utils/cn";
import ImageCard from "./components/ImageCard";
import AddImage from "./components/AddImage";

const App = () => {
  const [galleryImages, setGalleryImages] = useState(initialImageData);
  const handleImageSelect = (id: string) => {
    const allImages = [...galleryImages];
    const targetdImage = allImages.find((image) => image.id === id);

    if (targetdImage) {
      targetdImage.isSelected = !targetdImage?.isSelected;
    }
    setGalleryImages(allImages);
  };

  const handleImageDelete = () => {
    const remainingImages = galleryImages.filter((image) => !image.isSelected);
    setGalleryImages(remainingImages);
  };

  const mouseSensor = useSensor(MouseSensor);
  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  const handleDragStart = (e: DragStartEvent) => {
    console.log("from handle Start ", e);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    console.log("from handle end ", e);
    const { active, over } = e;
    if (!over) return;

    if (active.id !== over.id) {
      setGalleryImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className={cn("min-h-screen h-full flex justify-center items-center")}>
      <div className={cn("bg-white rounded-lg p-4 md:p-8 max-w-6xl w-full")}>
        <Header
          handleImageDelete={handleImageDelete}
          galleryImages={galleryImages}
        />
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext items={galleryImages} strategy={rectSortingStrategy}>
            <div
              className={cn("grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 ")}
            >
              {galleryImages.map((image) => (
                <ImageCard
                  handleImageSelect={handleImageSelect}
                  {...image}
                  key={image.id}
                />
              ))}
              <AddImage setGalleryImages={setGalleryImages} />
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default App;
