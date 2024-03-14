import { useEffect, useState } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ imageUrls }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevImageIndex) => {
        if (prevImageIndex === imageUrls.length - 1) return 0;
        return prevImageIndex + 1;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  });

  function showNextImage() {
    setImageIndex((prevImageIndex) => {
      if (prevImageIndex === imageUrls.length - 1) return 0;
      return prevImageIndex + 1;
    });
  }
  function showPrevImage() {
    setImageIndex((prevImageIndex) => {
      if (imageIndex === 0) return imageUrls.length - 1;
      return prevImageIndex - 1;
    });
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img src={imageUrls[imageIndex]} alt="slide" className="img-slider-img" />
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
      ></button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
      ></button>
    </div>
  );
}
