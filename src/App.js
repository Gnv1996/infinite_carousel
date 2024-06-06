import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    if (direction === "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
}

function Card(props) {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={props.image} alt={props.title} className="card-img" />
      </div>
    </div>
  );
}

function CardContainer({ images }) {
  const [disableScroll, setDisableScroll] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    cloneCards();
    window.addEventListener("resize", cloneCards);
    return () => {
      window.removeEventListener("resize", cloneCards);
    };
  }, []);

  const cloneCards = () => {
    const cards = Array.from(scrollContainerRef.current.children);
    const firstCardsClone = cards
      .slice(0, 6)
      .map((card) => card.cloneNode(true));
    const lastCardsClone = cards.slice(-6).map((card) => card.cloneNode(true));
    firstCardsClone.forEach((clone) => {
      clone.classList.add("is-clone");
      scrollContainerRef.current.appendChild(clone);
    });
    lastCardsClone.forEach((clone) => {
      clone.classList.add("is-clone");
      scrollContainerRef.current.insertBefore(
        clone,
        scrollContainerRef.current.firstChild
      );
    });
  };

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const containerWidth = container.clientWidth;
    const scrollPos = container.scrollLeft;
    const scrollWidth = container.scrollWidth;

    if (scrollPos + containerWidth >= scrollWidth) {
      const firstCardsClone = Array.from(container.children)
        .slice(0, 6)
        .map((card) => card.cloneNode(true));
      firstCardsClone.forEach((clone) => {
        clone.classList.add("is-clone");
        container.appendChild(clone);
      });
      container.scrollLeft = scrollPos - scrollWidth / 2;
    } else if (scrollPos <= 0) {
      // If scrolled to the left end, move last cards to the beginning
      const lastCardsClone = Array.from(container.children)
        .slice(-6)
        .map((card) => card.cloneNode(true));
      lastCardsClone.forEach((clone) => {
        clone.classList.add("is-clone");
        container.insertBefore(clone, container.firstChild);
      });
      container.scrollLeft = scrollPos + scrollWidth / 2;
    }
  };

  const scrollNext = (e) => {
    const container = e.currentTarget.previousSibling;
    sideScroll(container, "right", 10, 272, 10);
  };

  const scrollPrev = (e) => {
    const container = e.currentTarget.nextSibling;
    sideScroll(container, "left", 10, 272, 10);
  };

  return (
    <div className="card-container">
      <div className="scroll scroll-prev" onClick={scrollPrev}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div
        ref={scrollContainerRef}
        className="scrolling-wrapper"
        onScroll={handleScroll}
      >
        {images.map((image, index) => (
          <Card key={index} title={`Card Number ${index + 1}`} image={image} />
        ))}
      </div>
      <div className="scroll scroll-next" onClick={scrollNext}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
}

function Main() {
  const images = [
    "https://images.unsplash.com/photo-1523815378073-a43ae3fbf36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=776&q=80",
    "https://images.unsplash.com/photo-1512203492609-972c16baa28b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1487803836022-91054ca05fdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1530143584546-02191bc84eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    // Add more image URLs as needed
  ];

  return (
    <div className="main">
      <main className="content">
        <h1>Infinite Carousel</h1>
        <CardContainer images={images} />
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Main />
    </div>
  );
}

export default App;
