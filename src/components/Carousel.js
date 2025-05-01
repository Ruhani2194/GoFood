
import React from 'react';

export default function Carousel({ onSearchChange }) {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <form className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Type in..."
                aria-label="Search"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="btn text-white bg-success" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img src="/shake-shack-jam-recipe.webp" className="d-block w-100" style={{ filter: "brightness(50%)", width: "1000px", height: "1000px" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="/subway-cookies-recipe-stk4.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/pictures-of-pizza-23-1.jpg" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}


