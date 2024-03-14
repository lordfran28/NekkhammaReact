import slide1 from "../assets/img1.jpg";
import slide2 from "../assets/img2.jpg";
import slide3 from "../assets/img3.jpg";
import slide4 from "../assets/img4.jpg";
import slide5 from "../assets/img5.jpg";
import slide6 from "../assets/img6.jpg";
import slide7 from "../assets/img7.jpg";
import ImageSlider from "./ImageSlider";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

export default function Carousel() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "10 / 6",
        margin: "0 auto",
        // maxWidth: "1200px",
        // height: "800px",
      }}
    >
      <ImageSlider imageUrls={slides} />
    </div>
  );
}
