import React, { useRef, useState } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [slides] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80",
      title: "Slide 1",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512203492609-972c16baa28b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      title: "Slide 2",
    },
    {
      image:
        "https://images.unsplash.com/photo-1487803836022-91054ca05fdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      title: "Slide 3",
    },
    {
      image:
        "https://images.unsplash.com/photo-1530143584546-02191bc84eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
      title: "Slide 4",
    },
  ]);

  const carouselRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <main className="main">
      <div
        ref={carouselRef}
        className="carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseMove}
        onMouseUp={handleMouseMove}
      >
        <div className="carousel_track-container">
          <ul className="carousel_track">
            {slides.map((slide, index) => (
              <li key={index} className="carousel_slide">
                <div className="carousel_image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <h2 className="carousel_title">{slide.title}</h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Carousel;
