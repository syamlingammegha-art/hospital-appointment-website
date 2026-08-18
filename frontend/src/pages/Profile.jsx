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
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <div onClick={openGallery} style={{ cursor: "pointer" }}>
        {image ? (
          <img
            src={image}
            alt="Profile"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "50px",
              margin: "auto",
            }}
          >
            👤
          </div>
        )}
      </div>

      <p>Click the profile icon to choose from Gallery</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImage}
        style={{ display: "none" }}
      />
    </div>
  );
}