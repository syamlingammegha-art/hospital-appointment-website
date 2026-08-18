import { useRef, useState } from "react";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const openGallery = () => fileInputRef.current.click();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div onClick={openGallery} className="cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-5xl">
            👤
          </div>
        )}
      </div>

      <p className="mt-3">Tap to choose from Gallery</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="hidden"
      />
    </div>
  );
}