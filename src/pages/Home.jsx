import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div>
      <Carousel />
      <main>
        <h1>Essays</h1>
        <div className="essaysContainer">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </div>
        <h1>Recent posts</h1>
        <div className="postsContainer">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </div>
      </main>
    </div>
  );
}
